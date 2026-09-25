import cv2
import numpy as np
import os

brain_dir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/'
complete_path = os.path.join(brain_dir, 'suresh_16x9_complete_1790261063011.jpg')
stage1_path = os.path.join(brain_dir, 'suresh_16x9_stage1_1790261120592.jpg')

complete = cv2.imread(complete_path).astype(np.float32)
stage1 = cv2.imread(stage1_path).astype(np.float32)

H, W, _ = complete.shape

# Let's inspect the building bounding box:
# In complete:
# House spans x in [388, 1080], y in [95, 660]
# Outside this, it is background.

# Let's create a test straight frame and save it
print("Testing construction script...")
