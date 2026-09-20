import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.resolve('public/donuts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

async function run() {
  for (const file of files) {
    const svgPath = path.join(dir, file);
    const webpPath = path.join(dir, file.replace('.svg', '.webp'));
    const pngPath = path.join(dir, file.replace('.svg', '.png'));

    try {
      const svgBuffer = fs.readFileSync(svgPath);
      await sharp(svgBuffer, { density: 150 })
        .resize(800, 600, { fit: 'cover' })
        .webp({ quality: 90 })
        .toFile(webpPath);

      await sharp(svgBuffer, { density: 150 })
        .resize(800, 600, { fit: 'cover' })
        .png({ quality: 90 })
        .toFile(pngPath);

      console.log(`Rendered: ${webpPath} and ${pngPath}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

run();
