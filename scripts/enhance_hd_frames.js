const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(dirPath, targetWidth, targetHeight = null) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg') && !f.includes('backup'));
  console.log(`Enhancing ${files.length} frames in ${dirPath}...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(dirPath, file);

    // Read image buffer
    const inputBuf = fs.readFileSync(filePath);

    // Process with sharp: lanczos3 resize + unsharp mask filter + high quality JPEG
    let pipeline = sharp(inputBuf).resize(targetWidth, targetHeight, {
      kernel: 'lanczos3',
      fit: 'inside',
      withoutEnlargement: false,
    });

    // Apply sharpening filter specifically tuned for architectural structure detail
    pipeline = pipeline.sharpen({
      sigma: 1.25,
      m1: 1.0,
      m2: 2.2,
    });

    const outputBuf = await pipeline.jpeg({
      quality: 94,
      mozjpeg: true,
      chromaSubsampling: '4:4:4', // Full color resolution (no subsampling blur)
    }).toBuffer();

    fs.writeFileSync(filePath, outputBuf);
    count++;
    if (count % 20 === 0 || count === files.length) {
      console.log(`Processed ${count}/${files.length} frames...`);
    }
  }
  console.log(`Completed ${dirPath}!`);
}

async function main() {
  console.time('HD Processing Completed');

  // Desktop frames: upscale to 1920px width (Full HD crispness) with 4:4:4 full color chroma
  const desktopDir = path.join(__dirname, '..', 'public', 'frames');
  await processDirectory(desktopDir, 1920);

  // Mobile frames: upscale to 1080px width (Retina mobile crispness)
  const mobileDir = path.join(__dirname, '..', 'public', 'frames-mobile');
  await processDirectory(mobileDir, 1080);

  console.timeEnd('HD Processing Completed');
}

main().catch(console.error);
