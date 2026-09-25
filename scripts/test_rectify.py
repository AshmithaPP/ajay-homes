import cv2
import numpy as np

complete = cv2.imread('C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/suresh_16x9_complete_1790261063011.jpg')
raw_concrete = cv2.imread('C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/suresh_construction_stage1_1790260000877.jpg')

# In complete (1376 x 768):
# Let's locate the key corners on the front facade:
# Point 1 (Top-Left Pergola Front Corner): around (430, 125)
# Point 2 (Top-Right Pergola Front Corner): around (1025, 150)
# Point 3 (Bottom-Right Boundary Wall Corner): around (1080, 660)
# Point 4 (Bottom-Left Boundary Wall Corner): around (388, 660)

# In raw_concrete (1200 x 896):
# Point 1 (Top-Left Pergola Front Corner): around (380, 80)
# Point 2 (Top-Right Pergola Front Corner): around (860, 240)
# Point 3 (Bottom-Right Boundary Wall Corner): around (930, 800)
# Point 4 (Bottom-Left Boundary Wall Corner): around (270, 770)

pts_complete = np.array([
    [430, 125],
    [1025, 150],
    [1080, 660],
    [388, 660]
], dtype=np.float32)

pts_raw = np.array([
    [380, 80],
    [860, 240],
    [930, 800],
    [270, 770]
], dtype=np.float32)

# Compute homography
H, _ = cv2.findHomography(pts_raw, pts_complete)
warped = cv2.warpPerspective(raw_concrete, H, (1376, 768))

cv2.imwrite('public/construction-frames/test_rectified.jpg', warped)
print('Saved test_rectified.jpg!')
