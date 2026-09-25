const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/construction-frames');

const files = [
  'stage_01_foundation.jpg',
  'stage_02_concrete_frame.jpg',
  'stage_03_brickwork.jpg',
  'stage_04_plastering.jpg',
  'stage_05_facade_louvers.jpg',
  'stage_06_complete_villa.jpg',
];

async function convertFile(file) {
  const filePath = path.join(dir, file);
  const meta = await sharp(filePath).metadata();
  
  const targetW = Math.round(meta.height * 16 / 9);
  const targetH = meta.height;
  const padLeft = Math.round((targetW - meta.width) / 2);

  // 1. Generate full 16:9 covered background with subtle blur
  const bg = await sharp(filePath)
    .resize(targetW, targetH, { fit: 'cover', position: 'center' })
    .blur(14)
    .toBuffer();

  // 2. SVG linear gradient mask for smooth horizontal edge feathering
  const maskSvg = `
    <svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="feather" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="white" stop-opacity="0"/>
          <stop offset="5%" stop-color="white" stop-opacity="1"/>
          <stop offset="95%" stop-color="white" stop-opacity="1"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${meta.width}" height="${meta.height}" fill="url(#feather)"/>
    </svg>
  `;
  const maskBuffer = Buffer.from(maskSvg);

  // 3. Feather the original image edges
  const featheredCenter = await sharp(filePath)
    .ensureAlpha()
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .toBuffer();

  // 4. Composite the crisp centered house onto the matching 16:9 ambient background
  const tempPath = path.join(dir, 'tmp_' + file);
  await sharp(bg)
    .composite([{ input: featheredCenter, left: padLeft, top: 0 }])
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toFile(tempPath);

  // Overwrite original file
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
  console.log(`Converted ${file} to 16:9 widescreen (${targetW}x${targetH})`);
}

async function run() {
  for (const f of files) {
    await convertFile(f);
  }
  console.log('All 6 frames converted to 16:9 widescreen successfully!');
}

run().catch(console.error);
