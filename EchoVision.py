import torch
import time

repo = "isl-org/ZoeDepth"
# Zoe_N
model_zoe_n = torch.hub.load(repo, "ZoeD_N", pretrained=True, trust_repo=True)

from PIL import Image
from pillow_heif import register_heif_opener

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

zoe = model_zoe_n.to(DEVICE)

register_heif_opener()
image = Image.open("room-photo.jpg")
rgb_image = image.convert('RGB')

start = time.perf_counter()
depth_numpy = zoe.infer_pil(rgb_image)
print(time.perf_counter() - start)
print(depth_numpy)