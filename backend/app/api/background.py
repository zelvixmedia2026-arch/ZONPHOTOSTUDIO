import asyncio
import logging
from io import BytesIO
from pathlib import Path  # <--- THIS IS THE LINE THAT WAS MISSING

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from PIL import Image
from starlette.concurrency import run_in_threadpool

from app.schemes.response import ApiResponse
from app.services.image_effects import apply_background_color, parse_color
from app.services.local_background import remove_background_local
from app.utils.filemanager import FileManager
from app.utils.image_validation import read_image_upload

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/background",
    tags=["Background"],
)

# Increased timeout to 5 minutes
TIMEOUT_SECONDS = 300


def _replace(source_path: Path, color: tuple[int, int, int]) -> Image.Image:
    """Blocking work: remove the background, then place the subject on the colour."""
    print("🚀 AI Processing started...")
    cutout_png = remove_background_local(source_path)
    print("✅ AI Mask generated! Applying color...")
    cutout = Image.open(BytesIO(cutout_png)).convert("RGBA")
    return apply_background_color(cutout, color)


@router.post("/replace", summary="Remove background and replace it with a colour")
async def replace_background(
    image: UploadFile = File(...),
    background_color: str = Form(
        "#FFFFFF",
        description="A name (white, red, blue, green) or a hex code like #FFD700",
    ),
):
    try:
        color = parse_color(background_color)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    content, extension = await read_image_upload(image)
    source_path = FileManager.save_bytes(content, extension)

    try:
        result = await asyncio.wait_for(
            run_in_threadpool(_replace, source_path, color),
            timeout=TIMEOUT_SECONDS,
        )
    except asyncio.TimeoutError:
        raise HTTPException(status_code=504, detail="Processing took too long. Please try again.")
    except Exception:
        logger.exception("Background replacement failed")
        raise HTTPException(status_code=502, detail="Background replacement failed. Please try again.")
    finally:
        FileManager.delete_file(source_path)

    output_path = FileManager.save_output(result)

    return ApiResponse(
        success=True,
        message="Background replaced successfully.",
        data={
            "output_file": output_path.name,
            "image_url": f"/outputs/{output_path.name}",
            "background_color": "#{:02X}{:02X}{:02X}".format(*color),
        },
    )