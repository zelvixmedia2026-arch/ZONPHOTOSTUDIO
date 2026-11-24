import sys
import time
from io import BytesIO
from pathlib import Path

from PIL import Image

from app.config import OUTPUT_DIR
from app.services.image_effects import apply_background_color, parse_color
from app.services.local_background import remove_background_local

INPUT_DIR = Path("app/input")
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}


def process(path: Path, color_text: str) -> None:
    color = parse_color(color_text)
    tag = color_text.lower().replace("#", "")

    started = time.perf_counter()
    cutout = Image.open(BytesIO(remove_background_local(path))).convert("RGBA")
    final = apply_background_color(cutout, color)

    out_path = OUTPUT_DIR / f"{path.stem}_{tag}.png"
    final.save(out_path)
    elapsed = time.perf_counter() - started
    print(f"OK    {path.name} -> {out_path} ({elapsed:.1f}s)")


def main():
    if len(sys.argv) < 2:
        print('Usage:  python batch_bg.py "photo.jpg" yellow')
        print("        python batch_bg.py all yellow")
        return

    target = sys.argv[1]
    color_text = sys.argv[2] if len(sys.argv) > 2 else "yellow"

    try:
        parse_color(color_text)
    except ValueError as error:
        print(error)
        return

    if target.lower() == "all":
        files = sorted(p for p in INPUT_DIR.iterdir() if p.suffix.lower() in SUPPORTED)
        if not files:
            print(f"No images found in {INPUT_DIR.resolve()}")
            return
    else:
        path = INPUT_DIR / target
        if not path.exists():
            print(f"File not found: {path.resolve()}")
            print("Run 'dir app\\input' to see the exact file name.")
            return
        files = [path]

    for path in files:
        try:
            process(path, color_text)
        except Exception as error:
            print(f"FAIL  {path.name}: {error}")

    print(f"Done. Results are in {OUTPUT_DIR.resolve()}")


if __name__ == "__main__":
    main()