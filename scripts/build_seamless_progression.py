import cv2
import numpy as np

# Load base 16:9 images
brain_dir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/'
complete = cv2.imread(brain_dir + 'suresh_16x9_complete_1790261063011.jpg')
stage1 = cv2.imread(brain_dir + 'suresh_16x9_stage1_1790261120592.jpg')

H, W, _ = complete.shape

# 1. Concrete & Construction textures
# Convert complete to raw grey curing concrete
gray = cv2.cvtColor(complete, cv2.COLOR_BGR2GRAY)
concrete_rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

# Apply concrete tonal grade (slate grey, matte finish)
raw_concrete = np.clip(concrete_rgb.astype(np.float32) * 0.84 + 18, 0, 255).astype(np.uint8)

# Add subtle aggregate surface texture
np.random.seed(101)
noise = np.random.normal(0, 3.5, (H, W, 3)).astype(np.float32)
raw_concrete = np.clip(raw_concrete.astype(np.float32) + noise, 0, 255).astype(np.uint8)

# 2. Brickwork & AAC block texture synthesis for infill walls
# Red brick color: BGR ~ (42, 65, 160)
brick_layer = complete.copy()
# Infill zones:
# First floor right wall: x in [680, 1010], y in [355, 430]
# First floor left wall: x in [450, 675], y in [355, 430]
# Ground floor wall behind gate: x in [510, 770], y in [440, 535]
# Boundary wall right panel: x in [780, 1060], y in [545, 650]

def apply_brickwork(img, x1, y1, x2, y2, block_type='brick'):
    roi = img[y1:y2, x1:x2].astype(np.float32)
    rh, rw, _ = roi.shape
    
    if block_type == 'brick':
        # Red clay brick pattern
        base_color = np.array([45, 75, 165], dtype=np.float32)
        mortar_color = np.array([170, 175, 180], dtype=np.float32)
        brick_h = 10
        brick_w = 22
        mortar_t = 2
        
        for y in range(rh):
            row = y // (brick_h + mortar_t)
            is_mortar_y = (y % (brick_h + mortar_t)) < mortar_t
            offset_x = (row % 2) * (brick_w // 2)
            for x in range(rw):
                is_mortar_x = ((x + offset_x) % (brick_w + mortar_t)) < mortar_t
                if is_mortar_y or is_mortar_x:
                    roi[y, x] = mortar_color
                else:
                    # Variation in brick tone
                    var = (np.sin(x * 0.3) * np.cos(y * 0.3)) * 12
                    roi[y, x] = np.clip(base_color + var, 0, 255)
    else:
        # Grey AAC blocks (larger 16x32 grey masonry blocks)
        base_color = np.array([160, 165, 170], dtype=np.float32)
        mortar_color = np.array([120, 125, 130], dtype=np.float32)
        block_h = 16
        block_w = 34
        mortar_t = 2
        
        for y in range(rh):
            row = y // (block_h + mortar_t)
            is_mortar_y = (y % (block_h + mortar_t)) < mortar_t
            offset_x = (row % 2) * (block_w // 2)
            for x in range(rw):
                is_mortar_x = ((x + offset_x) % (block_w + mortar_t)) < mortar_t
                if is_mortar_y or is_mortar_x:
                    roi[y, x] = mortar_color
                else:
                    var = (np.sin(x * 0.2) * np.cos(y * 0.2)) * 10
                    roi[y, x] = np.clip(base_color + var, 0, 255)
                    
    img[y1:y2, x1:x2] = roi.astype(np.uint8)

# 3. Helper to draw realistic steel scaffolding grid
def draw_scaffolding(img, x1, y1, x2, y2, spacing_x=55, spacing_y=60):
    overlay = img.copy()
    pipe_color_galv = (185, 190, 195)
    pipe_color_yellow = (40, 180, 225)
    joint_color = (60, 65, 70)
    
    # Vertical standards
    for x in range(x1, x2, spacing_x):
        color = pipe_color_yellow if ((x // spacing_x) % 3 == 0) else pipe_color_galv
        cv2.line(overlay, (x, y1), (x, y2), color, 3)
        # Shadow next to pipe
        cv2.line(overlay, (x + 2, y1), (x + 2, y2), (40, 40, 40), 1)

    # Horizontal ledgers
    for y in range(y1, y2, spacing_y):
        cv2.line(overlay, (x1, y), (x2, y), pipe_color_galv, 3)
        # Wooden walk board
        cv2.line(overlay, (x1, y + 4), (x2, y + 4), (60, 110, 150), 4)

    # Diagonal braces
    for x in range(x1, x2 - spacing_x * 2, spacing_x * 2):
        cv2.line(overlay, (x, y2), (x + spacing_x * 2, y1), pipe_color_galv, 2)

    # Couplers/clamps at intersections
    for x in range(x1, x2, spacing_x):
        for y in range(y1, y2, spacing_y):
            cv2.circle(overlay, (x, y), 4, joint_color, -1)
            
    # Soft blend with structure
    cv2.addWeighted(overlay, 0.88, img, 0.12, 0, img)

# 4. Helper to draw rebar column cages reaching into sky
def draw_rebar_columns(img, column_x_list, y_base, y_top):
    rebar_color = (55, 75, 110) # Rust/steel dark brown
    tie_wire_color = (80, 95, 125)
    
    for cx in column_x_list:
        width = 18
        # Vertical rebar rods (4 main corner rods)
        for rx in [cx - 8, cx - 3, cx + 3, cx + 8]:
            # Jitter slightly for realistic hand-tied rebar
            pts = []
            for y in range(y_base, y_top, -20):
                jitter_x = int(np.sin(y * 0.1 + cx) * 1.5)
                pts.append((rx + jitter_x, y))
            for i in range(len(pts) - 1):
                cv2.line(img, pts[i], pts[i+1], rebar_color, 2)
                
        # Lateral stirrups / ties every 25px
        for ty in range(y_base, y_top, -25):
            cv2.rectangle(img, (cx - 9, ty - 1), (cx + 9, ty + 1), tie_wire_color, 1)

# Building bounds:
# Facade x in [388, 1075]
# Pergola y in [95, 235]
# First floor y in [235, 430]
# Ground floor y in [430, 535]
# Boundary wall y in [535, 660]
column_positions = [425, 500, 680, 775, 930, 1025]

# ==============================================================================
# STAGE 2: Ground Floor Concrete Frame & Columns Rising into Sky
# ==============================================================================
print("Generating Stage 02: Ground floor RCC structure & rising columns...")
stage2 = stage1.copy()

# Ground floor structure (y: 450 to 660) from raw_concrete
# Transition mask: below y=470 is built, above y=450 is open sky
gf_mask = np.zeros((H, W), dtype=np.float32)
pts_gf = np.array([
    [388, 455],
    [1075, 455],
    [1075, 660],
    [388, 660]
], dtype=np.int32)
cv2.fillPoly(gf_mask, [pts_gf], 1.0)
gf_mask = cv2.GaussianBlur(gf_mask, (9, 9), 0)
gf_mask_3ch = np.dstack([gf_mask, gf_mask, gf_mask])

# Ground floor cast in raw concrete
stage2 = (raw_concrete * gf_mask_3ch + stage1 * (1.0 - gf_mask_3ch)).astype(np.uint8)

# Vertical rebar columns rising from ground floor columns (y: 470) up into sky (y: 300)
draw_rebar_columns(stage2, column_positions, 475, 300)

# Scaffolding around ground floor
draw_scaffolding(stage2, 400, 455, 1060, 660, spacing_x=55, spacing_y=50)

# Construction materials on ground: keep from stage1 (gravel, sand piles)
cv2.imwrite('public/construction-frames/stage_02_concrete_frame.jpg', stage2, [cv2.IMWRITE_JPEG_QUALITY, 96])

# ==============================================================================
# STAGE 3: Full Concrete Structural Frame (Ground + 1st Floor + Cantilevers)
# ==============================================================================
print("Generating Stage 03: Full 3-story concrete frame skeleton...")
stage3 = stage1.copy()

# Slabs up to roof (y: 130 to 660)
frame_mask = np.zeros((H, W), dtype=np.float32)
pts_frame = np.array([
    [405, 120],
    [1035, 120],
    [1075, 660],
    [388, 660]
], dtype=np.int32)
cv2.fillPoly(frame_mask, [pts_frame], 1.0)
frame_mask = cv2.GaussianBlur(frame_mask, (7, 7), 0)
frame_mask_3ch = np.dstack([frame_mask, frame_mask, frame_mask])

# Raw concrete structure
stage3 = (raw_concrete * frame_mask_3ch + stage1 * (1.0 - frame_mask_3ch)).astype(np.uint8)

# Formwork shoring jacks under cantilevers (vertical wooden props every 20px)
for prop_x in range(435, 1025, 22):
    # Under first floor slab (y: 430 to 475)
    cv2.line(stage3, (prop_x, 435), (prop_x, 480), (55, 100, 140), 3)

# Full facade steel scaffolding
draw_scaffolding(stage3, 400, 130, 1060, 660, spacing_x=55, spacing_y=55)

# Rebar starter extensions at top of columns
draw_rebar_columns(stage3, column_positions, 140, 70)

cv2.imwrite('public/construction-frames/stage_03_brickwork.jpg', stage3, [cv2.IMWRITE_JPEG_QUALITY, 96])

# ==============================================================================
# STAGE 4: Masonry & AAC Block Wall Infill
# ==============================================================================
print("Generating Stage 04: Brick & AAC block masonry infill...")
stage4 = raw_concrete.copy()

# Apply AAC grey blocks to first floor upper walls
apply_brickwork(stage4, 680, 345, 1010, 430, block_type='aac')
apply_brickwork(stage4, 445, 345, 675, 430, block_type='aac')

# Apply red clay brickwork to ground floor and boundary wall
apply_brickwork(stage4, 510, 440, 770, 535, block_type='brick')
apply_brickwork(stage4, 785, 545, 1065, 650, block_type='brick')

# Unglazed window voids: darken interior rooms
cv2.rectangle(stage4, (750, 445), (970, 535), (25, 30, 35), -1) # Ground window
cv2.rectangle(stage4, (460, 350), (660, 425), (25, 30, 35), -1) # Balcony room void

# Concrete window lintels
cv2.rectangle(stage4, (745, 440), (975, 448), (140, 145, 150), -1)
cv2.rectangle(stage4, (455, 345), (665, 353), (140, 145, 150), -1)

# Scaffolding on masonry facade
draw_scaffolding(stage4, 400, 110, 1060, 660, spacing_x=60, spacing_y=60)

# Mask against background so surroundings are 100% untouched
full_mask = np.zeros((H, W), dtype=np.float32)
pts_full = np.array([
    [405, 95],
    [1035, 95],
    [1075, 660],
    [388, 660]
], dtype=np.int32)
cv2.fillPoly(full_mask, [pts_full], 1.0)
full_mask = cv2.GaussianBlur(full_mask, (5, 5), 0)
full_mask_3ch = np.dstack([full_mask, full_mask, full_mask])

stage4_blended = (stage4 * full_mask_3ch + complete * (1.0 - full_mask_3ch)).astype(np.uint8)
cv2.imwrite('public/construction-frames/stage_04_plastering.jpg', stage4_blended, [cv2.IMWRITE_JPEG_QUALITY, 96])

# ==============================================================================
# STAGE 5: Plastering, White Primer & Teak Louver Installation
# ==============================================================================
print("Generating Stage 05: Plastered white shell, teak louvers & detailing...")
stage5 = complete.copy()

# In Stage 5:
# - Walls are smoothly plastered and primed in clean architectural white
# - The teak louvers on the first floor and rooftop terrace are installed
# - Windows are installed
# - But boundary wall gate is in grey primer (not yet painted black)
cv2.rectangle(stage5, (495, 560), (780, 660), (120, 125, 130), -1)
for gy in range(570, 660, 10):
    cv2.line(stage5, (495, gy), (780, gy), (90, 95, 100), 2)

# Scaffolding being dismantled (light scaffolding remaining on the left tower)
draw_scaffolding(stage5, 405, 160, 520, 480, spacing_x=55, spacing_y=55)

# Mask against background
stage5_blended = (stage5 * full_mask_3ch + complete * (1.0 - full_mask_3ch)).astype(np.uint8)
cv2.imwrite('public/construction-frames/stage_05_facade_louvers.jpg', stage5_blended, [cv2.IMWRITE_JPEG_QUALITY, 96])

print("All 4 intermediate construction frames successfully synthesized with ZERO cutting!")
