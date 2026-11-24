import logging
import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from PIL import Image

from app.config import OUTPUT_DIR, UPLOAD_DIR

logger = logging.getLogger(__name__)

SAFE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


class FileManager:
    """Handles uploaded and processed file operations."""

    @staticmethod
    def generate_filename(extension: str) -> str:
        return f"{uuid4()}{extension}"

    @staticmethod
    def save_upload(upload_file: UploadFile) -> Path:
        # Rewind first: earlier reads leave the stream at the end.
        upload_file.file.seek(0)

        # Never trust the client's filename. Keep only a known extension.
        suffix = Path(upload_file.filename or "").suffix.lower()
        extension = suffix if suffix in SAFE_EXTENSIONS else ".img"

        save_path = UPLOAD_DIR / FileManager.generate_filename(extension)

        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(upload_file.file, buffer)

        return save_path

    @staticmethod
    def save_bytes(content: bytes, extension: str) -> Path:
        save_path = UPLOAD_DIR / FileManager.generate_filename(extension)
        save_path.write_bytes(content)
        return save_path

    @staticmethod
    def save_output(image: Image.Image) -> Path:
        save_path = OUTPUT_DIR / FileManager.generate_filename(".png")
        image.save(save_path)
        return save_path

    @staticmethod
    def delete_file(file_path: Path) -> None:
        try:
            if file_path.exists():
                file_path.unlink()
        except OSError:
            # On Windows a file can stay locked while a background task still runs.
            logger.warning("Could not delete temporary file %s", file_path.name)