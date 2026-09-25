const sharp = require('sharp');
const path = require('path');

const brainDir = 'C:/Users/ashmi/.gemini/antigravity-ide/brain/fa8997fc-9580-47dd-a6f4-dd62ec06caa2';
const base16x9 = path.join(brainDir, 'suresh_16x9_complete_1790261063011.jpg');
const src = path.join(brainDir, 'suresh_construction_stage1_1790260000877.jpg');

async function test() {
  const baseMeta = await sharp(base16x9).metadata();
  const W = baseMeta.width; // 1376
  const H = baseMeta.height; // 768

  // If we scale src to fill 1376 width or height:
  // src is 1200 x 896.
  // In create_perfect_16x9, it was resized to height 768, so width was 1029.
  // Then it was placed in center with padLeft = 173.
  // Notice that on both left and right (width 173), base16x9 was visible.
  // But why did it look dark at the border?
  // Because blend: 'dest-in' with SVG was used.
  
  // Let's create an actual alpha channel programmatically using raw pixel buffer!
  // For width 1029, height 768:
  const resizedSrc = await sharp(src).resize({ height: H }).raw().toBuffer({ resolveWithObject: true });
  const rw = resizedSrc.info.width;
  const rh = resizedSrc.info.height;
  
  // Create an RGBA buffer where RGB comes from resizedSrc and A comes from a smooth cosine feather!
  const rgba = Buffer.alloc(rw * rh * 4);
  const featherWidth = 140; // 140 pixels smooth blend
  
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const srcIdx = (y * rw + x) * 3;
      const dstIdx = (y * rw + x) * 4;
      
      rgba[dstIdx] = resizedSrc.data[srcIdx];
      rgba[dstIdx + 1] = resizedSrc.data[srcIdx + 1];
      rgba[dstIdx + 2] = resizedSrc.data[srcIdx + 2];
      
      // Calculate alpha: 0 at edges, 255 in center
      let alpha = 255;
      if (x < featherWidth) {
        // Smooth sine curve: 0 to 1
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
    .jpeg({ quality: 96 })
    .toFile('public/construction-frames/test_feather_02.jpg');
    
  console.log('Saved test_feather_02.jpg!');
}

test().catch(console.error);
