import re

from PIL import Image

COLORS = {
    "white": (255, 255, 255),
    "black": (0, 0, 0),
    "red": (220, 20, 60),
    "blue": (67, 142, 219),
    "green": (0, 180, 0),
    "yellow": (255, 215, 0),
}

HEX_PATTERN = re.compile(r"^#?([0-9A-Fa-f]{6})$")


def parse_color(value: str) -> tuple[int, int, int]:
    """Accepts a name (white, red, blue, green, yellow, black) or a hex code like #FFD700."""
    value = (value or "").strip()

    if value.lower() in COLORS:
        return COLORS[value.lower()]

    match = HEX_PATTERN.match(value)
    if not match:
        raise ValueError(
            "Colour must be a name (white, red, blue, green, yellow, black) "
            "or a hex code like #FFD700."
        )

    digits = match.group(1)
    return tuple(int(digits[i:i + 2], 16) for i in (0, 2, 4))


def apply_background_color(cutout: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    """Places a transparent cutout on a solid colour and returns an RGB image."""
    cutout = cutout.convert("RGBA")
    background = Image.new("RGBA", cutout.size, color + (255,))
    return Image.alpha_composite(background, cutout).convert("RGB")