import cv2
import numpy as np

complete = cv2.imread('C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/suresh_16x9_complete_1790261063011.jpg')
raw_concrete = cv2.imread('C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/suresh_construction_stage1_1790260000877.jpg')

# Corresponding homography points between angled shot and straight front elevation:
pts_complete = np.array([
    [410, 110],    # Top-Left Pergola
    [1040, 120],   # Top-Right Pergola
    [1080, 660],   # Bottom-Right Wall
    [388, 660]     # Bottom-Left Wall
], dtype=np.float32)

pts_raw = np.array([
    [360, 60],     # Top-Left Pergola
    [870, 235],    # Top-Right Pergola
    [930, 800],    # Bottom-Right Wall
    [268, 770]     # Bottom-Left Wall
], dtype=np.float32)

H, _ = cv2.findHomography(pts_raw, pts_complete)
warped = cv2.warpPerspective(raw_concrete, H, (1376, 768), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)

# Building mask: exactly around the building facade
mask = np.zeros((768, 1376), dtype=np.uint8)
pts = np.array([
    [400, 100],
    [1040, 100],
    [1070, 655],
    [395, 655]
], dtype=np.int32)
cv2.fillPoly(mask, [pts], 255)

# Center of the clone
center = (int((400 + 1070) / 2), int((100 + 655) / 2))

# Seamless clone
cloned = cv2.seamlessClone(warped, complete, mask, center, cv2.NORMAL_CLONE)

cv2.imwrite('public/construction-frames/test_seamless_01.jpg', cloned, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved test_seamless_01.jpg!")
