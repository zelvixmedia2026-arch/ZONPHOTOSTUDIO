from io import BytesIO

from fastapi import HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

# Pillow format name -> stored file extension
ALLOWED_FORMATS = {"JPEG": ".jpg", "PNG": ".png", "WEBP": ".webp"}


def validate_image_bytes(content: bytes) -> str:
    """Checks the real image content with Pillow. Returns the stored extension."""
    try:
        with Image.open(BytesIO(content)) as img:
            fmt = img.format
            img.verify()
    except (
        UnidentifiedImageError,
        Image.DecompressionBombError,
        OSError,
        ValueError,
        SyntaxError,
    ):
        raise HTTPException(status_code=400, detail="Invalid or corrupted image.")

    if fmt not in ALLOWED_FORMATS:
        raise HTTPException(status_code=400, detail="Upload a JPG, PNG, or WEBP image.")

    return ALLOWED_FORMATS[fmt]


async def read_image_upload(upload: UploadFile) -> tuple[bytes, str]:
    """Reads at most MAX_FILE_SIZE + 1 bytes, then validates size and content."""
    content = await upload.read(MAX_FILE_SIZE + 1)

    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="Image must be smaller than 10 MB.")

    extension = validate_image_bytes(content)
    return content, extension