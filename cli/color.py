import re

# #ffffff
COLOR_RGB_REGEX = r"#([0-9a-fA-F]{6})"
# opacity(#ffffff, 100%)
COLOR_RGB_OPACITY_REGEX = r"opacity\((#[0-9a-fA-F]{6}), (100|[0-9]{1,2})%\)"
# opacity(other-token, 100%)
COLOR_TOKEN_OPACITY_REGEX = r"opacity\(([0-9a-z-]+), (100|[0-9]{1,2})%\)"
TOKEN_REGEX = r"[0-9a-z-]+"


class InvalidColorFormatError(Exception):
    def __init__(self, raw: str):
        self.message = f"{raw} is not using a known color format. Only rgb hex strings and `opacity` functions are allowed"


class NoColorEnvironmentError(Exception):
    def __init__(self, name: str):
        self.message = f"Attempted to derive {name}, but no color environment was given"


class NoExistingColorError(Exception):
    def __init__(self, token_name: str):
        self.message = (
            f"Attempted to derive a color using {token_name}, but it does not exist yet"
        )


def rgb_hex_to_parts(raw: str):
    return map(lambda s: int("".join(s), 16), zip(*[iter(raw)] * 2))


class Color:
    red: int
    green: int
    blue: int
    alpha: int

    @staticmethod
    def from_str(raw: str, environment=None):  # environment is Dict[str, Color]
        if (match := re.fullmatch(COLOR_RGB_REGEX, raw)) is not None:
            red, green, blue = rgb_hex_to_parts(match.group(1))
            return Color(red, green, blue)

        if (match := re.fullmatch(COLOR_RGB_OPACITY_REGEX, raw)) is not None:
            red, green, blue = rgb_hex_to_parts(match.group(1))
            alpha = int(match.group(2))
            return Color(red, green, blue, alpha)

        # Attempt to derive this token's color value from another token in the
        # environment given by `environment`
        if (match := re.fullmatch(COLOR_TOKEN_OPACITY_REGEX, raw)) is not None:
            token_name = match.group(1)
            if environment is None:
                raise NoColorEnvironmentError(token_name)
            if environment.get(token_name) is None:
                print(environment)
                raise NoExistingColorError(token_name)

            base: Color = environment[token_name].color
            alpha = int(match.group(2))
            return Color(base.red, base.green, base.blue, alpha)

        raise InvalidColorFormatError(raw)

    def __init__(self, red: int, green: int, blue: int, alpha: int = 100):
        self.red = red
        self.green = green
        self.blue = blue
        self.alpha = alpha

    def to_hex(self):
        if self.alpha < 100:
            return f"#{self.red:02x}{self.green:02x}{self.blue:02x}{self.alpha:02x}"
        return f"#{self.red:02x}{self.green:02x}{self.blue:02x}"

    def to_rgba(self):
        if self.alpha < 100:
            return f"rgba({self.red}, {self.green}, {self.blue}, {self.alpha}%)"
        return f"rgb({self.red}, {self.green}, {self.blue})"
