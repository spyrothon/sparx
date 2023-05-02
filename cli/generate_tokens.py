from io import TextIOWrapper
import os
from pathlib import Path
import shutil
from sys import argv
import typing as t

from color import Color
from config import Config, BaseTokens, ThemeMap, ThemeToken


def get_project_root():
    given_root_dir = argv[1]
    if given_root_dir is not None:
        return given_root_dir

    return os.getcwd()


PROJECT_ROOT = Path(get_project_root())

DS_DIR = PROJECT_ROOT / ".design_system"
TOKENS_PATH = DS_DIR / "base_tokens.json"
THEMES_PATH = DS_DIR / "themes.json"

GENERATED_ROOT = DS_DIR / "generated"
GENERATED_CSS_COLORS_PATH = GENERATED_ROOT / "ColorTokens.css"
GENERATED_CSS_FONTS_PATH = GENERATED_ROOT / "FontTokens.css"
GENERATED_CSS_SPACINGS_PATH = GENERATED_ROOT / "Spacing.css"
GENERATED_CSS_THEMES_PATH = GENERATED_ROOT / "Themes.css"
GENERATED_CSS_ROOT_PATH = GENERATED_ROOT / "DesignSystem.css"


def write_color_tokens(file_path: Path, tokens: BaseTokens):
    with open(file_path, "w") as file:
        file.write(
            """/** Generated Color Tokens. Do not edit manually **/\n\n:root {\n"""
        )

        grouped_colors = {}
        for (name, token) in tokens.colors.items():
            token_list = grouped_colors.get(token.group, [])
            token_list.append(token)
            grouped_colors[token.group] = token_list

        for (group, token_list) in grouped_colors.items():
            file.write(f"  /** {group} **/\n")
            for token in sorted(token_list, key=lambda token: token.name):
                file.write(f"  --{token.name}: {token.color.to_hex()};\n")
            file.write(f"\n")

        file.write("}\n")


def write_font_tokens(
    file_path: Path,
    fonts: t.Dict[str, str],
    font_weights: t.Dict[str, int],
    font_import: t.Optional[str],
):
    with open(file_path, "w") as file:
        file.write("""/** Generated Font Tokens. Do not edit manually **/\n\n""")

        if font_import is not None:
            file.write(f"{font_import}\n\n")

        file.write(""":root {\n""")

        for (name, stack) in fonts.items():
            file.write(f"  --font-{name}: {stack};\n")

        for (name, weight) in font_weights.items():
            file.write(f"  --font-weight-{name}: {weight};\n")

        file.write("}\n")


def write_spacing_tokens(
    file_path: Path, spacings: t.Dict[str, float], radii: t.Dict[str, str]
):
    with open(file_path, "w") as file:
        file.write(
            """/** Generated Spacing Tokens. Do not edit manually **/\n\n:root {\n"""
        )

        for (name, value) in radii.items():
            file.write(f"  --radius-{name}: {value};\n")
        for (name, value) in spacings.items():
            file.write(f"  --space-{name}: {value}px;\n")

        file.write("}\n")


def write_theme_tokens(file_path: Path, theme_map: ThemeMap):
    theme_names = theme_map.themes

    def write_token(
        file: TextIOWrapper, token: ThemeToken, name: t.Optional[str] = None
    ):
        name = name or token.name
        value = token.value
        if isinstance(value, Color):
            file.write(f"  --{name}: {value.to_rgba()};\n")
        else:
            file.write(f"  --{name}: var(--{value});\n")

    with open(file_path, "w") as file:
        file.write("""/** Generated Theme Tokens. Do not edit manually **/\n\n""")

        # Write the accent definitions first
        for (accent, tokens) in theme_map.accents.items():
            for (index, theme) in enumerate(theme_names):
                file.write(f".theme-{theme}.accent-{accent} {{\n")
                for (token, value) in tokens.items():
                    write_token(file, value[index], f"accent-{token}")
                file.write("}\n\n")

        # Then write the comprehensive theme definitions
        for (theme, tokens) in theme_map.theme_tokens.items():
            file.write(f".theme-{theme} {{\n")
            for token in tokens:
                write_token(file, token)
            # Include a `color-scheme` definition to hint at browser user agents
            file.write(f"  color-scheme: {theme};\n")
            file.write("}\n\n")


def write_root_css(file_path: Path, imports: t.List[Path]):
    with open(file_path, "w") as file:
        for target in imports:
            file.write(f'@import "./{target.relative_to(file_path.parent)}";\n')


config = Config(TOKENS_PATH, THEMES_PATH)

print(f"Re-creating {GENERATED_ROOT} to hold generated files")
shutil.rmtree(GENERATED_ROOT)
os.makedirs(GENERATED_ROOT, exist_ok=True)

print(f"Writing color tokens to {GENERATED_CSS_COLORS_PATH}")
write_color_tokens(GENERATED_CSS_COLORS_PATH, config.base_tokens)
print(f"Writing font tokens to {GENERATED_CSS_FONTS_PATH}")
write_font_tokens(
    GENERATED_CSS_FONTS_PATH,
    config.base_tokens.fonts,
    config.base_tokens.fontWeights,
    config.base_tokens.fontImport,
)
print(f"Writing spacing tokens to {GENERATED_CSS_SPACINGS_PATH}")
write_spacing_tokens(
    GENERATED_CSS_SPACINGS_PATH, config.base_tokens.spacings, config.base_tokens.radii
)
print(f"Writing themes to {GENERATED_CSS_COLORS_PATH}")
write_theme_tokens(GENERATED_CSS_THEMES_PATH, config.themes)

print(f"Writing root CSS file to {GENERATED_CSS_ROOT_PATH}")
write_root_css(
    GENERATED_CSS_ROOT_PATH,
    [
        GENERATED_CSS_COLORS_PATH,
        GENERATED_CSS_FONTS_PATH,
        GENERATED_CSS_SPACINGS_PATH,
        GENERATED_CSS_THEMES_PATH,
    ],
)
