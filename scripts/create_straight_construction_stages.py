import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import os

brain_dir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/'
complete_path = os.path.join(brain_dir, 'suresh_16x9_complete_1790261063011.jpg')
stage1_path = os.path.join(brain_dir, 'suresh_16x9_stage1_1790261120592.jpg')
output_dir = 'public/construction-frames'

complete_bgr = cv2.imread(complete_path)
stage1_bgr = cv2.imread(stage1_path)

H, W, _ = complete_bgr.shape
print(f"Base dimensions: {W}x{H}")

# Bounding box of the house facade on the lot
# Left edge of boundary wall: x ~ 388
# Right edge of boundary wall: x ~ 1080
# Top of pergola: y ~ 95
# Top of roof slab: y ~ 235
# Top of first floor balcony: y ~ 430
# Top of boundary wall: y ~ 535
# Bottom of boundary wall: y ~ 660

# Let's inspect the sky region in stage1 and complete
# In both images, the sky above y=95 is clean blue sky
# Between complete and stage1, the background outside x in [388, 1080] is almost identical.

print("Script template ready.")
