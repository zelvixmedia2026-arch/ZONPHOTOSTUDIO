import threading
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import new_session, remove

MODEL_NAME = "birefnet-general"
EROSION_PIXELS = 1

_session = None
_session_lock = threading.Lock()

def _get_session():
    """Loads the model once and reuses it."""
    global _session
    with _session_lock:
        if _session is None:
            _session = new_session(MODEL_NAME)
    return _session

def _refine_alpha(cutout: Image.Image) -> Image.Image:
    """Shrinks the edge slightly so old-background colour doesn't show as a halo."""
    rgba = cutout.convert("RGBA")
    alpha = rgba.getchannel("A")
    for _ in range(EROSION_PIXELS):
        alpha = alpha.filter(ImageFilter.MinFilter(3))
    rgba.putalpha(alpha)
    return rgba

def remove_background_local(image_path: str | Path) -> bytes:
    """Removes the background on this PC and returns a transparent PNG as bytes."""
    with Image.open(image_path) as source:
        # 1. Resize large images to speed up processing massively
        source.thumbnail((1024, 1024))
        image = source.convert("RGBA")

    cutout = remove(
        image,
        session=_get_session(),
        # 2. Turn OFF alpha matting for speed. The base model is already great.
        alpha_matting=False, 
    )

    out = BytesIO()
    _refine_alpha(cutout).save(out, format="PNG")
    return out.getvalue()