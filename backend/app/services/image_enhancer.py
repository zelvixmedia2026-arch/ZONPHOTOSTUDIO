import cv2
import numpy as np
from PIL import Image
import torch
from basicsr.archs.rrdbnet_arch import RRDBNet
from realesrgan import RealESRGANer
from gfpgan import GFPGANer

# Global variables to hold the models in memory
_upsampler = None
_face_enhancer = None

def _get_models():
    global _upsampler, _face_enhancer
    if _upsampler is None:
        print("Loading Real-ESRGAN and GFPGAN models...")
        
        # Check if CUDA (GPU) is available
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Using device: {device}")

        # 1. Setup Real-ESRGAN (For general background upscaling)
        model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=2)
        _upsampler = RealESRGANer(
            scale=2,
            model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth',
            model=model,
            tile=400,
            tile_pad=10,
            pre_pad=0,
            half=True if device.type == 'cuda' else False,
            device=device
        )
        
        # 2. Setup GFPGAN (For face restoration)
        _face_enhancer = GFPGANer(
            model_path='https://github.com/TencentARC/GFPGAN/releases/download/v1.3.0/GFPGANv1.3.pth',
            upscale=2,
            arch='clean',
            channel_multiplier=2,
            bg_upsampler=_upsampler, # Chain them: ESRGAN does background, GFPGAN does face
            device=device
        )
        print("Models loaded successfully!")
    return _upsampler, _face_enhancer

def enhance_image(image_path: str) -> Image.Image:
    """Enhances a blurry image using Real-ESRGAN + GFPGAN."""
    _get_models()
    
    # Read image using OpenCV
    img = cv2.imread(str(image_path), cv2.IMREAD_COLOR)
    
    # Run the enhancement
    # The .enhance method returns (cropped_face, restored_face, output_img)
    _, _, output = _face_enhancer.enhance(
        img, 
        has_aligned=False, 
        only_center_face=False, 
        paste_back=True
    )
    
    # Convert OpenCV BGR array to PIL RGB Image
    output_rgb = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)
    return Image.fromarray(output_rgb)