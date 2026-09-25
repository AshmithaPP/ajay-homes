import cv2
import numpy as np

complete = cv2.imread('C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/suresh_16x9_complete_1790261063011.jpg')
raw_concrete = cv2.imread('C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/suresh_construction_stage1_1790260000877.jpg')

# Points in complete (1376 x 768)
pts_complete = np.array([
    [410, 110],    # Top-Left Pergola
    [1040, 120],   # Top-Right Pergola
    [1080, 660],   # Bottom-Right Wall
    [388, 660]     # Bottom-Left Wall
], dtype=np.float32)

# Points in raw_concrete (1200 x 896)
pts_raw = np.array([
    [360, 60],     # Top-Left Pergola
    [870, 235],    # Top-Right Pergola
    [930, 800],    # Bottom-Right Wall
    [268, 770]     # Bottom-Left Wall
], dtype=np.float32)

H, _ = cv2.findHomography(pts_raw, pts_complete)
warped = cv2.warpPerspective(raw_concrete, H, (1376, 768), flags=cv2.INTER_CUBIC)

# Create a clean mask for the central lot:
# The lot is strictly between x = 388 and x = 1080
# Above y = 80, below y = 720
mask = np.zeros((768, 1376), dtype=np.float32)

# Front facade polygon:
# Top pergola: from x=400, y=95 to x=1045, y=95
# Down right side: x=1050 to x=1080 at y=660
# Along ground: y=660 to x=388
# Up left side: from x=388, y=660 to x=400, y=95
poly = np.array([
    [395, 95],
    [1045, 95],
    [1075, 660],
    [388, 660]
], dtype=np.int32)

cv2.fillPoly(mask, [poly], 1.0)
mask = cv2.GaussianBlur(mask, (15, 15), 0)
mask_3ch = np.dstack([mask, mask, mask])

# Blend warped concrete onto base16x9 (complete)
result = (warped * mask_3ch + complete * (1.0 - mask_3ch)).astype(np.uint8)

cv2.imwrite('public/construction-frames/test_straight_concrete.jpg', result)
print('Saved test_straight_concrete.jpg!')
