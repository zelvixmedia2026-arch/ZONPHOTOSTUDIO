import os
import sys
import time
from io import BytesIO
from pathlib import Path

from PIL import Image

from app.services.image_effects import apply_background_color, parse_color
from app.services.local_background import remove_background_local
from app.utils.filemanager import FileManager


def main():
    if len(sys.argv) < 3:
        print('Usage: python remove_bg_cli.py "photo.jpg" red')
        print("Colour: white, black, red, blue, green, yellow, or a hex code like #FFD700")
        sys.exit(1)

    source = Path(sys.argv[1])
    if not source.exists():
        print(f"File not found: {source}")
        sys.exit(1)

    try:
        Image.open(source).verify()
    except Exception:
        print("That file is not a valid image.")
        sys.exit(1)

    try:
        color = parse_color(sys.argv[2])
    except ValueError as error:
        print(error)
        sys.exit(1)

    print("Removing background... (the first run downloads the model, please wait)")
    started = time.perf_counter()

    cutout_png = remove_background_local(source)
    cutout = Image.open(BytesIO(cutout_png)).convert("RGBA")
    final = apply_background_color(cutout, color)

    elapsed = time.perf_counter() - started

    final_path = FileManager.save_output(final)
    cutout_path = FileManager.save_output(cutout)

    print()
    print(f"Done in {elapsed:.1f} seconds")
    print(f"Colour used:       #{color[0]:02X}{color[1]:02X}{color[2]:02X}")
    print(f"Final image:       {final_path}")
    print(f"Transparent cutout: {cutout_path}")
    print(f"Browser URL:       http://127.0.0.1:8000/outputs/{final_path.name}")

    if sys.platform == "win32":
        os.startfile(final_path)  # opens the image in your default viewer


if __name__ == "__main__":
    main()