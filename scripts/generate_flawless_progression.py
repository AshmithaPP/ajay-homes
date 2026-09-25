import cv2
import numpy as np

# Load source 16:9 images
brain_dir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2/'
complete = cv2.imread(brain_dir + 'suresh_16x9_complete_1790261063011.jpg')
stage1 = cv2.imread(brain_dir + 'suresh_16x9_stage1_1790261120592.jpg')

H, W, _ = complete.shape

# ------------------------------------------------------------------------------
# PREPARE TEXTURE LAYERS
# ------------------------------------------------------------------------------

# 1. Raw RCC Concrete Texture (Derived from complete with realistic tonal grade)
gray = cv2.cvtColor(complete, cv2.COLOR_BGR2GRAY)
concrete_rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

# Concrete tone: natural curing cement slate grey
raw_concrete = np.clip(concrete_rgb.astype(np.float32) * 0.82 + 22, 0, 255).astype(np.uint8)

# Add subtle aggregate grain
np.random.seed(42)
noise = np.random.normal(0, 3.5, (H, W, 3)).astype(np.float32)
raw_concrete = np.clip(raw_concrete.astype(np.float32) + noise, 0, 255).astype(np.uint8)

# Add horizontal formwork shuttering panel seams across the concrete facade
for fy in range(120, 660, 48):
    # Formwork joint groove (shadow + highlight)
    cv2.line(raw_concrete, (390, fy), (1075, fy), (50, 55, 60), 1)
    cv2.line(raw_concrete, (390, fy + 1), (1075, fy + 1), (140, 145, 150), 1)
    # Tie-rod holes (little circular indentations every 80px)
    for fx in range(410, 1070, 80):
        cv2.circle(raw_concrete, (fx, fy - 24), 2, (40, 45, 50), -1)

# 2. Brickwork and AAC Block Infill Layer
brick_layer = raw_concrete.copy()

def fill_brickwork(img, x1, y1, x2, y2, is_aac=False):
    roi = img[y1:y2, x1:x2].astype(np.float32)
    rh, rw, _ = roi.shape
    if rh <= 0 or rw <= 0:
        return
        
    lum = (cv2.cvtColor(img[y1:y2, x1:x2], cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0)[:, :, np.newaxis]
    
    if not is_aac:
        # Red clay brick
        base_color = np.array([40, 70, 160], dtype=np.float32) # BGR Red Brick
        mortar_color = np.array([170, 175, 180], dtype=np.float32)
        bh, bw, mt = 11, 24, 2
    else:
        # Grey AAC blocks
        base_color = np.array([150, 155, 160], dtype=np.float32) # BGR Grey AAC
        mortar_color = np.array([115, 120, 125], dtype=np.float32)
        bh, bw, mt = 18, 36, 2

    pattern = np.zeros((rh, rw, 3), dtype=np.float32)
    for y in range(rh):
        row = y // (bh + mt)
        is_my = (y % (bh + mt)) < mt
        ox = (row % 2) * (bw // 2)
        for x in range(rw):
            is_mx = ((x + ox) % (bw + mt)) < mt
            if is_my or is_mx:
                pattern[y, x] = mortar_color
            else:
                var = np.sin(x * 0.25) * np.cos(y * 0.25) * 12.0
                pattern[y, x] = np.clip(base_color + var, 0, 255)
                
    # Multiply with natural scene lighting/shadows
    blended = np.clip(pattern * lum * 1.25, 0, 255).astype(np.uint8)
    img[y1:y2, x1:x2] = blended

# Infill zones on brick_layer
fill_brickwork(brick_layer, 680, 345, 1010, 430, is_aac=True)  # First floor right AAC
fill_brickwork(brick_layer, 440, 345, 675, 430, is_aac=True)   # First floor left AAC
fill_brickwork(brick_layer, 510, 440, 770, 535, is_aac=False)  # Ground floor red brick
fill_brickwork(brick_layer, 785, 545, 1065, 650, is_aac=False) # Boundary wall red brick

# Darken unglazed window voids
cv2.rectangle(brick_layer, (750, 445), (970, 535), (25, 28, 32), -1)
cv2.rectangle(brick_layer, (460, 350), (660, 425), (25, 28, 32), -1)

# Precast concrete lintels over openings
cv2.rectangle(brick_layer, (745, 440), (975, 448), (145, 150, 155), -1)
cv2.rectangle(brick_layer, (455, 345), (665, 353), (145, 150, 155), -1)


# ------------------------------------------------------------------------------
# SCAFFOLDING & REBAR HELPERS
# ------------------------------------------------------------------------------
def render_scaffolding(canvas, x1, y1, x2, y2, step_x=55, step_y=55):
    overlay = canvas.copy()
    pipe_yellow = (35, 185, 235)  # Safety yellow pipes
    pipe_silver = (180, 185, 190) # Galvanized steel pipes
    wood_plank  = (50, 95, 140)   # Timber walk planks
    joint_clamp = (50, 55, 60)

    # Vertical standards
    for x in range(x1, x2, step_x):
        color = pipe_yellow if ((x // step_x) % 3 == 0) else pipe_silver
        cv2.line(overlay, (x, y1), (x, y2), (30, 30, 30), 4) # shadow
        cv2.line(overlay, (x, y1), (x, y2), color, 2)

    # Horizontal ledgers & walk platforms
    for y in range(y1, y2, step_y):
        cv2.line(overlay, (x1, y), (x2, y), (30, 30, 30), 4) # shadow
        cv2.line(overlay, (x1, y), (x2, y), pipe_silver, 2)
        cv2.line(overlay, (x1, y + 3), (x2, y + 3), wood_plank, 4)

    # Diagonal braces
    for x in range(x1, x2 - step_x * 2, step_x * 2):
        cv2.line(overlay, (x, y2), (x + step_x * 2, y1), pipe_silver, 2)

    # Coupler clamps
    for x in range(x1, x2, step_x):
        for y in range(y1, y2, step_y):
            cv2.circle(overlay, (x, y), 3, joint_clamp, -1)

    cv2.addWeighted(overlay, 0.90, canvas, 0.10, 0, canvas)

def render_rebar_columns(canvas, cols_x, y_base, y_top):
    rebar_steel = (45, 65, 95) # Rust steel brown
    for cx in cols_x:
        for rx in [cx - 7, cx - 2, cx + 2, cx + 7]:
            pts = []
            for y in range(y_base, y_top, -15):
                jitter = int(np.sin(y * 0.12 + cx) * 1.5)
                pts.append((rx + jitter, y))
            for i in range(len(pts) - 1):
                cv2.line(canvas, pts[i], pts[i+1], rebar_steel, 2)
        # Stirrup rings
        for ty in range(y_base, y_top, -22):
            cv2.rectangle(canvas, (cx - 8, ty - 1), (cx + 8, ty + 1), (65, 80, 110), 1)

# Primary column coordinates of Suresh Manor
column_coords = [425, 500, 680, 775, 930, 1025]


# ==============================================================================
# GENERATE ALL 6 STAGES
# ==============================================================================

# STAGE 1: Foundation (100% pure photographic site excavation)
cv2.imwrite('public/construction-frames/stage_01_foundation.jpg', stage1, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved Stage 01: Foundation")

# STAGE 2: Ground Floor Concrete Frame & Columns Rising into Sky
# - Structure from y=485 down to y=660 is built in raw concrete
# - Above y=485: Pure natural sky & trees from stage1
# - Vertical rebar cages rise from columns up to y=310 into the sky
stage2 = stage1.copy()

# Ground floor concrete mask
m2 = np.zeros((H, W), dtype=np.float32)
pts2 = np.array([
    [388, 485],
    [1075, 485],
    [1075, 660],
    [388, 660]
], dtype=np.int32)
cv2.fillPoly(m2, [pts2], 1.0)
m2 = cv2.GaussianBlur(m2, (7, 7), 0)
m2_3ch = np.dstack([m2, m2, m2])

stage2 = (raw_concrete * m2_3ch + stage1 * (1.0 - m2_3ch)).astype(np.uint8)

# Rising steel rebar cages reaching into open sky
render_rebar_columns(stage2, column_coords, 488, 310)

# Ground floor scaffolding
render_scaffolding(stage2, 395, 485, 1065, 660, step_x=55, step_y=50)

cv2.imwrite('public/construction-frames/stage_02_concrete_frame.jpg', stage2, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved Stage 02: Ground floor structure & columns")

# STAGE 3: Ground + First Floor Cantilever Balcony & Slabs Cast
# - Structure from y=340 down to y=660 is built in raw concrete
# - Above y=340: Pure natural sky & trees from stage1
# - Cantilever timber props underneath first floor balcony
# - Rebar columns extend up to y=150 into the sky
stage3 = stage1.copy()

m3 = np.zeros((H, W), dtype=np.float32)
pts3 = np.array([
    [400, 340],
    [1040, 340],
    [1075, 660],
    [388, 660]
], dtype=np.int32)
cv2.fillPoly(m3, [pts3], 1.0)
m3 = cv2.GaussianBlur(m3, (7, 7), 0)
m3_3ch = np.dstack([m3, m3, m3])

stage3 = (raw_concrete * m3_3ch + stage1 * (1.0 - m3_3ch)).astype(np.uint8)

# Timber shoring props supporting the first floor cantilever (y: 430 to 480)
for px in range(435, 1025, 20):
    cv2.line(stage3, (px, 435), (px, 485), (55, 95, 140), 3)

# Rising rebar columns up to roof level
render_rebar_columns(stage3, column_coords, 345, 150)

# Scaffolding on two lower floors
render_scaffolding(stage3, 395, 340, 1065, 660, step_x=55, step_y=55)

cv2.imwrite('public/construction-frames/stage_03_brickwork.jpg', stage3, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved Stage 03: 1st floor slabs & cantilever")

# STAGE 4: Full 3-Story Concrete Frame & Pergola Skeleton + Brickwork Infill
# - Structure complete from y=95 to y=660
# - Brick and AAC block masonry infills
# - Full facade scaffolding
stage4 = stage1.copy()

m4 = np.zeros((H, W), dtype=np.float32)
pts4 = np.array([
    [405, 95],
    [1035, 95],
    [1075, 660],
    [388, 660]
], dtype=np.int32)
cv2.fillPoly(m4, [pts4], 1.0)
m4 = cv2.GaussianBlur(m4, (5, 5), 0)
m4_3ch = np.dstack([m4, m4, m4])

stage4 = (brick_layer * m4_3ch + stage1 * (1.0 - m4_3ch)).astype(np.uint8)

# Full height steel scaffolding
render_scaffolding(stage4, 395, 100, 1065, 660, step_x=55, step_y=55)

cv2.imwrite('public/construction-frames/stage_04_plastering.jpg', stage4, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved Stage 04: Full structural frame + brick infill")

# STAGE 5: Plastered Shell, White Primer & Louver Installation
# - Clean architectural white primer on all walls
# - Teak louvers mounted on first floor and rooftop
# - Boundary wall gate in grey primer
# - Light remaining scaffolding on left tower
stage5 = complete.copy()

# Gate in primer
cv2.rectangle(stage5, (495, 560), (780, 660), (120, 125, 130), -1)
for gy in range(570, 660, 10):
    cv2.line(stage5, (495, gy), (780, gy), (95, 100, 105), 2)

# Touch-up scaffolding on left vertical feature wall
render_scaffolding(stage5, 400, 160, 500, 480, step_x=50, step_y=55)

cv2.imwrite('public/construction-frames/stage_05_facade_louvers.jpg', stage5, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved Stage 05: Plastered white, louvers & railings")

# STAGE 6: Masterpiece Turnkey Handover
cv2.imwrite('public/construction-frames/stage_06_complete_villa.jpg', complete, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("Saved Stage 06: Completed Luxury Villa")

print("All 6 stages generated with 100% pixel-perfect seamlessness!")
