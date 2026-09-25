const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/construction-frames');
const brainDir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2';

const base16x9 = path.join(brainDir, 'suresh_16x9_complete_1790261063011.jpg');
const stage1_16x9 = path.join(brainDir, 'suresh_16x9_stage1_1790261120592.jpg');

const stages = [
  {
    name: 'stage_01_foundation.jpg',
    source: stage1_16x9,
    isAlready16x9: true,
  },
  {
    name: 'stage_02_concrete_frame.jpg',
    source: path.join(brainDir, 'suresh_construction_stage1_1790260000877.jpg'),
    isAlready16x9: false,
  },
  {
    name: 'stage_03_brickwork.jpg',
    source: path.join(brainDir, 'suresh_stage2_brickwork_1790260096074.jpg'),
    isAlready16x9: false,
  },
  {
    name: 'stage_04_plastering.jpg',
    source: path.join(brainDir, 'suresh_stage3_plastering_1790260244791.jpg'),
    isAlready16x9: false,
  },
  {
    name: 'stage_05_facade_louvers.jpg',
    source: path.join(brainDir, 'suresh_stage4_facade_1790260386573.jpg'),
    isAlready16x9: false,
  },
  {
    name: 'stage_06_complete_villa.jpg',
    source: base16x9,
    isAlready16x9: true,
  },
];

async function processStages() {
  const baseMeta = await sharp(base16x9).metadata();
  const W = baseMeta.width; // 1376
  const H = baseMeta.height; // 768

  console.log(`Processing all 6 stages for 16:9 widescreen: ${W}x${H}...`);

  for (const stage of stages) {
    const destPath = path.join(targetDir, stage.name);

    if (stage.isAlready16x9) {
      await sharp(stage.source)
        .resize(W, H)
        .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
        .toFile(destPath);
      console.log(`Saved pure 16:9 ${stage.name}`);
    } else {
      // High-precision smooth cosine feather blend onto 16:9 widescreen canvas
      const resizedSrc = await sharp(stage.source)
        .resize({ height: H })
        .raw()
        .toBuffer({ resolveWithObject: true });

      const rw = resizedSrc.info.width;
      const rh = resizedSrc.info.height;
      const rgba = Buffer.alloc(rw * rh * 4);
      const featherWidth = 150; // Smooth 150px organic transition

      for (let y = 0; y < rh; y++) {
        for (let x = 0; x < rw; x++) {
          const srcIdx = (y * rw + x) * 3;
          const dstIdx = (y * rw + x) * 4;

          rgba[dstIdx] = resizedSrc.data[srcIdx];
          rgba[dstIdx + 1] = resizedSrc.data[srcIdx + 1];
          rgba[dstIdx + 2] = resizedSrc.data[srcIdx + 2];

          let alpha = 255;
          if (x < featherWidth) {
            alpha = Math.round(255 * (0.5 - 0.5 * Math.cos((Math.PI * x) / featherWidth)));
          } else if (x > rw - featherWidth) {
            const distFromRight = rw - 1 - x;
            alpha = Math.round(255 * (0.5 - 0.5 * Math.cos((Math.PI * distFromRight) / featherWidth)));
          }
          rgba[dstIdx + 3] = alpha;
        }
      }

      const padLeft = Math.round((W - rw) / 2);

      await sharp(base16x9)
        .composite([{
          input: rgba,
          raw: { width: rw, height: rh, channels: 4 },
          left: padLeft,
          top: 0
        }])
        .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
        .toFile(destPath);

      console.log(`Generated seamless 16:9 ${stage.name}`);
    }
  }

  console.log('Successfully prepared all 6 stages in 16:9 widescreen format!');
}

processStages().catch(console.error);
