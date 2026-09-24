const fs = require('fs');
const path = require('path');

async function downloadBatch(items, concurrency = 12) {
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      if (!current) break;
      const { url, dest } = current;
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
        continue;
      }
      try {
        const res = await fetch(url);
        if (!res.ok) {
          console.error(`Failed ${url}: ${res.status}`);
          continue;
        }
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buf);
      } catch (err) {
        console.error(`Error ${url}:`, err.message);
      }
    }
  }
  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
}

async function main() {
  const desktopDir = path.join('public', 'frames');
  const mobileDir = path.join('public', 'frames-mobile');
  if (!fs.existsSync(desktopDir)) fs.mkdirSync(desktopDir, { recursive: true });
  if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

  const tasks = [];

  // Desktop: 1 to 127
  for (let i = 1; i <= 127; i++) {
    const filename = `frame_${String(i).padStart(4, '0')}.jpg`;
    tasks.push({
      url: `https://kpconstructions.group/frames/${filename}`,
      dest: path.join(desktopDir, filename),
    });
  }

  // Mobile: 1 to 146
  for (let i = 1; i <= 146; i++) {
    const filename = `frame_${String(i).padStart(4, '0')}.jpg`;
    tasks.push({
      url: `https://kpconstructions.group/frames-mobile/${filename}`,
      dest: path.join(mobileDir, filename),
    });
  }

  console.log(`Starting download of ${tasks.length} total frames...`);
  console.time('Frames downloaded');
  await downloadBatch(tasks, 16);
  console.timeEnd('Frames downloaded');
  console.log('All frames downloaded successfully!');
}

main().catch(console.error);
