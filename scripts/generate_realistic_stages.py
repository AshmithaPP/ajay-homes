import cv2
import numpy as np

# Load base 16:9 images
brain_dir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/'
complete = cv2.imread(brain_dir + 'suresh_16x9_complete_1790261063011.jpg')
stage1 = cv2.imread(brain_dir + 'suresh_16x9_stage1_1790261120592.jpg')

H, W, C = complete.shape

# The building is situated on the lot:
# Left lot boundary: x = 388 (left neighbor wall)
# Right lot boundary: x = 1080 (right neighbor wall / curb)
# Ground / road curb: y = 660
# Boundary wall: y in [535, 660]
# Ground floor facade: y in [430, 535]
# First floor slab & balcony: y in [340, 430]
# Second floor / terrace slab: y in [235, 340]
# Rooftop pergola: y in [95, 235]
# Sky above pergola: y in [0, 95]

print("Images loaded. Let's build the realistic architectural progression.")
