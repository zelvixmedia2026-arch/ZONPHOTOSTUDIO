import io

from PIL import Image

import app.services.local_background as local_background


def test_returns_transparent_png(tmp_path, monkeypatch):
    source = tmp_path / "photo.png"
    Image.new("RGB", (48, 48), (200, 50, 50)).save(source)

    def fake_remove(image, session, **options):
        return Image.new("RGBA", image.size, (0, 0, 0, 0))

    monkeypatch.setattr(local_background, "remove", fake_remove)
    monkeypatch.setattr(local_background, "new_session", lambda name: object())

    png = local_background.remove_background_local(source)
    result = Image.open(io.BytesIO(png))

    assert result.format == "PNG"
    assert result.mode == "RGBA"
    assert result.getpixel((0, 0))[3] == 0