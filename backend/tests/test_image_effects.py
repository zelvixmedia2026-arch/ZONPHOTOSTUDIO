import pytest
from PIL import Image

from app.services.image_effects import apply_background_color, parse_color


def test_named_colour():
    assert parse_color("white") == (255, 255, 255)


def test_hex_colour_with_hash():
    assert parse_color("#FF0000") == (255, 0, 0)


def test_hex_colour_without_hash():
    assert parse_color("ffd700") == (255, 215, 0)


@pytest.mark.parametrize("bad", ["notacolour", "#GGGGGG", "#FFF", ""])
def test_invalid_colour_raises(bad):
    with pytest.raises(ValueError):
        parse_color(bad)


def test_transparent_pixels_take_background_colour():
    cutout = Image.new("RGBA", (10, 10), (0, 0, 0, 0))
    assert apply_background_color(cutout, (255, 0, 0)).getpixel((0, 0)) == (255, 0, 0)


def test_opaque_pixels_keep_subject_colour():
    cutout = Image.new("RGBA", (10, 10), (0, 255, 0, 255))
    assert apply_background_color(cutout, (255, 0, 0)).getpixel((5, 5)) == (0, 255, 0)