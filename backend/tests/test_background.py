import io

import pytest
from fastapi.testclient import TestClient
from PIL import Image

import app.api.background as background
from app.config import OUTPUT_DIR
from app.main import app

client = TestClient(app)


def png_bytes(color=(200, 50, 50)):
    buf = io.BytesIO()
    Image.new("RGB", (64, 64), color).save(buf, format="PNG")
    return buf.getvalue()


@pytest.fixture
def clean_outputs():
    before = set(OUTPUT_DIR.iterdir())
    yield
    for path in set(OUTPUT_DIR.iterdir()) - before:
        path.unlink()


def test_route_registered():
    assert "/background/replace" in app.openapi()["paths"]


def test_invalid_colour_rejected():
    r = client.post(
        "/background/replace",
        files={"image": ("a.png", png_bytes(), "image/png")},
        data={"background_color": "notacolour"},
    )
    assert r.status_code == 400


def test_invalid_image_rejected():
    r = client.post(
        "/background/replace",
        files={"image": ("a.png", b"not an image", "image/png")},
        data={"background_color": "red"},
    )
    assert r.status_code == 400


def test_empty_file_rejected():
    r = client.post(
        "/background/replace",
        files={"image": ("a.png", b"", "image/png")},
        data={"background_color": "red"},
    )
    assert r.status_code == 400


def test_replaces_background_with_red(clean_outputs, monkeypatch):
    def fake_remove(path):
        buf = io.BytesIO()
        Image.new("RGBA", (64, 64), (0, 0, 0, 0)).save(buf, format="PNG")
        return buf.getvalue()

    monkeypatch.setattr(background, "remove_background_local", fake_remove)

    r = client.post(
        "/background/replace",
        files={"image": ("a.png", png_bytes(), "image/png")},
        data={"background_color": "#FF0000"},
    )
    body = r.json()

    assert r.status_code == 200
    assert body["success"] is True
    assert body["data"]["background_color"] == "#FF0000"

    result = Image.open(OUTPUT_DIR / body["data"]["output_file"]).convert("RGB")
    assert result.getpixel((0, 0)) == (255, 0, 0)


def test_failure_hides_details(monkeypatch):
    def boom(path):
        raise RuntimeError("secret internal detail")

    monkeypatch.setattr(background, "remove_background_local", boom)

    r = client.post(
        "/background/replace",
        files={"image": ("a.png", png_bytes(), "image/png")},
        data={"background_color": "red"},
    )

    assert r.status_code == 502
    assert "secret" not in r.text