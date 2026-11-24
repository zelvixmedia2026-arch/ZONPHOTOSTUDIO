import re
import urllib.request
from PIL import Image, ImageOps
import numpy as np

COLORS = {
    "white": (255, 255, 255),
    "black": (0, 0, 0),
    "red": (220, 20, 60),
    "blue": (67, 142, 219),
    "green": (0, 180, 0),
    "yellow": (255, 215, 0),
    "light-blue": (211, 227, 248),
    "gray": (224, 224, 224),
    "dark-gray": (158, 158, 158),
}

HEX_PATTERN = re.compile(r"^#?([0-9A-Fa-f]{6})$")

def parse_color(value: str) -> tuple[int, int, int]:
    value = (value or "").strip()
    if value.lower() in COLORS:
        return COLORS[value.lower()]

    match = HEX_PATTERN.match(value)
    if not match:
        raise ValueError(f"Invalid color format: {value}")
        
    digits = match.group(1)
    return tuple(int(digits[i:i + 2], 16) for i in (0, 2, 4))

def apply_background_color(cutout: Image.Image, bg_value: str) -> Image.Image:
    """Places a transparent cutout on a solid color, gradient, OR scene image."""
    cutout = cutout.convert("RGBA")
    
    if bg_value.startswith("http"):
        # 1. It's a Scene Image URL
        try:
            req = urllib.request.Request(bg_value, headers={'User-Agent': 'Mozilla/5.0'})
            bg_img = Image.open(urllib.request.urlopen(req)).convert("RGBA")
            # Crop and resize to exactly match the cutout dimensions without stretching
            background = ImageOps.fit(bg_img, cutout.size, centering=(0.5, 0.5))
        except Exception as e:
            print(f"Error loading background URL: {e}")
            background = Image.new("RGBA", cutout.size, (255, 255, 255, 255)) # Fallback to white
            
    elif "," in bg_value:
        # 2. It's a Gradient
        hex1, hex2 = bg_value.split(",")
        c1 = parse_color(hex1)
        c2 = parse_color(hex2)
        
        top = np.linspace(c1, c2, cutout.height)
        arr = np.tile(top[:, np.newaxis, :], (1, cutout.width, 1)).astype(np.uint8)
        background = Image.fromarray(arr).convert("RGBA")
        
    else:
        # 3. It's a Solid Color
        color = parse_color(bg_value)
        background = Image.new("RGBA", cutout.size, color + (255,))
        
    return Image.alpha_composite(background, cutout).convert("RGB")