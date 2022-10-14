from dataclasses import dataclass
from pathlib import Path
import json
import re
import typing as t

from color import Color, TOKEN_REGEX


@dataclass
class BaseColorToken:
    name: str
    color: Color
    group: str


@dataclass
class BaseTokens:
    name: str
    description: str
    colors: t.Dict[str, BaseColorToken]
    fonts: t.Dict[str, str]
    fontWeights: t.Dict[str, int]
    spacings: t.Dict[str, float]


@dataclass
class ThemeToken:
    name: str
    value: t.Union[BaseColorToken, str]


@dataclass
class ThemeMap:
    themes: t.List[str]
    accents: t.Dict[str, t.Dict[str, t.List[ThemeToken]]]
    theme_tokens: t.Dict[str, t.List[ThemeToken]]


REQUIRED_ACCENT_TOKENS = [
    "primary",
    "background",
    "foreground",
    "hover",
    "active",
    "text",
    "translucent",
]


class InvalidAccentDefinitionError(Exception):
    def __init__(self, name: str, missing: str):
        self.message = f"{name} accent color was missing definition for {missing}"


class Config:
    base_tokens: BaseTokens
    themes: ThemeMap

    def __init__(self, tokens_path: Path, themes_path: Path):
        self.base_tokens = self.load_base_tokens(tokens_path)
        self.themes = self.load_theme_definitions(themes_path)

    def load_base_tokens(self, file_path: Path) -> BaseTokens:
        with open(file_path, "r") as file:
            raw = json.load(file)

            # Generate token names from the given color scales
            color_tokens: t.Dict[str, BaseColorToken] = {}
            for (name, color) in raw["colors"].items():
                for (value, scale) in zip(color, raw["scaleNames"]):
                    token_name = f"{name}-{scale}"
                    color_tokens[token_name] = BaseColorToken(
                        name=token_name, color=Color.from_str(value), group=name
                    )

            # Append static color definitions.
            for (name, value) in raw["staticColors"].items():
                color_tokens[name] = BaseColorToken(
                    name, color=Color.from_str(value), group="static"
                )

            return BaseTokens(
                name=raw["name"],
                description=raw["description"],
                colors=color_tokens,
                fonts=raw["fonts"],
                fontWeights=raw["fontWeights"],
                spacings=raw["spacings"],
            )

    def resolve_token(self, value):
        # If this token maps directly to a plain token, just pass it through as is
        if re.fullmatch(TOKEN_REGEX, value):
            return value

        # Otherwise, try to parse it into a new color value
        return Color.from_str(value, self.base_tokens.colors)

    def load_theme_definitions(self, file_path: Path) -> ThemeMap:
        with open(file_path, "r") as file:
            raw = json.load(file)

            # Validate that all accent definitions are complete and resolve their values
            resolved_accents = {}
            for (accent, tokens) in raw["accents"].items():
                resolved_accents[accent] = {}
                for required in REQUIRED_ACCENT_TOKENS:
                    values = tokens.get(required, None)
                    if values is None:
                        raise InvalidAccentDefinitionError(accent, required)

                    resolved_accents[accent][required] = list(
                        map(
                            lambda v: ThemeToken(
                                name=required, value=self.resolve_token(v)
                            ),
                            values,
                        )
                    )

            # Resolve token values from base tokens and functions
            theme_names = raw["themes"]
            resolved_tokens: t.Dict[str, t.List[ThemeToken]] = {}
            for theme in theme_names:
                resolved_tokens[theme] = []

            for (name, theme_values) in raw["tokens"].items():
                for (index, value) in enumerate(theme_values):
                    theme = theme_names[index]
                    resolved_tokens[theme].append(
                        ThemeToken(
                            name=name,
                            value=self.resolve_token(value),
                        )
                    )

            return ThemeMap(
                themes=raw["themes"],
                accents=resolved_accents,
                theme_tokens=resolved_tokens,
            )
