import cv2
import numpy as np

brain_dir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/'
complete = cv2.imread(brain_dir + 'suresh_16x9_complete_1790261063011.jpg')
stage1 = cv2.imread(brain_dir + 'suresh_16x9_stage1_1790261120592.jpg')

raw_concrete = cv2.imread(brain_dir + 'suresh_construction_stage1_1790260000877.jpg')
brickwork = cv2.imread(brain_dir + 'suresh_stage2_brickwork_1790260096074.jpg')
plaster = cv2.imread(brain_dir + 'suresh_stage3_plastering_1790260244791.jpg')
facade = cv2.imread(brain_dir + 'suresh_stage4_facade_1790260386573.jpg')

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

Y, X = np.ogrid[:768, :1376]

poly = np.array([
    [388, 0],
    [1075, 0],
    [1075, 660],
    [388, 660]
], dtype=np.int32)

base_poly_mask = np.zeros((768, 1376), dtype=np.float32)
cv2.fillPoly(base_poly_mask, [poly], 1.0)

# Smooth cosine curves: 0.5 - 0.5 * cos(pi * t)
def smooth(t):
    return 0.5 - 0.5 * np.cos(np.pi * t)

f_left = np.clip((X - 388) / 50.0, 0.0, 1.0)
f_right = np.clip((1075 - X) / 50.0, 0.0, 1.0)
f_top = np.clip(Y / 80.0, 0.0, 1.0)
f_bottom = np.clip((665 - Y) / 15.0, 0.0, 1.0)

feather_mask = base_poly_mask * smooth(f_left) * smooth(f_right) * smooth(f_top) * smooth(f_bottom)

def process_stage(src_img, filename):
    warped = cv2.warpPerspective(src_img, H, (1376, 768), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
    
    # Sky color calibration
    sky_zone = (Y < 120) & (base_poly_mask > 0)
    for c in range(3):
        diff = np.mean(complete[:60, 450:1000, c]) - np.mean(warped[:60, 450:1000, c])
        factor = np.clip((120 - Y) / 120.0, 0.0, 1.0)
        warped[:, :, c] = np.clip(warped[:, :, c].astype(np.float32) + diff * factor, 0, 255).astype(np.uint8)
        
    final_mask_3ch = np.dstack([feather_mask, feather_mask, feather_mask])
    blended = (warped * final_mask_3ch + complete * (1.0 - final_mask_3ch)).astype(np.uint8)
    
    out_path = f'public/construction-frames/{filename}'
    cv2.imwrite(out_path, blended, [cv2.IMWRITE_JPEG_QUALITY, 96])
    print(f"Processed and saved {filename}!")

# Process all 4 intermediate stages
process_stage(raw_concrete, 'stage_02_concrete_frame.jpg')
process_stage(brickwork, 'stage_03_brickwork.jpg')
process_stage(plaster, 'stage_04_plastering.jpg')
process_stage(facade, 'stage_05_facade_louvers.jpg')

print("All straight construction stages regenerated cleanly with replicated sky borders!")
