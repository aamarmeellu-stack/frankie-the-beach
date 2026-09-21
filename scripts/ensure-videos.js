import fs from 'fs';
import path from 'path';

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// Find and sync all videos 1 through 6
const rootFiles = fs.readdirSync('.');
const publicFiles = fs.readdirSync('public');

console.log('[ensure-videos] Scanning for Frankie videos 1-6...');

for (let i = 1; i <= 6; i++) {
  // Check in public
  let found = publicFiles.find(f => {
    const l = f.toLowerCase();
    return (l.includes(`video ${i}`) || l.includes(`video-${i}`) || l.includes(`video${i}`)) &&
           (l.endsWith('.mp4') || l.endsWith('.webm') || l.endsWith('.mov'));
  });

  // Check in root
  if (!found) {
    const inRoot = rootFiles.find(f => {
      const l = f.toLowerCase();
      return (l.includes(`video ${i}`) || l.includes(`video-${i}`) || l.includes(`video${i}`)) &&
             (l.endsWith('.mp4') || l.endsWith('.webm') || l.endsWith('.mov'));
    });
    if (inRoot) {
      console.log(`[ensure-videos] Copying root file "${inRoot}" to public/`);
      fs.copyFileSync(inRoot, `public/${inRoot}`);
      found = inRoot;
    }
  }

  if (found) {
    // Ensure both naming conventions exist in public
    const canonicalHyphen = `public/video-${i}-frankie.mp4`;
    const canonicalSpace = `public/video ${i} frankie.mp4`;

    if (!fs.existsSync(canonicalHyphen)) {
      console.log(`[ensure-videos] Creating ${canonicalHyphen}`);
      fs.copyFileSync(`public/${found}`, canonicalHyphen);
    }
    if (!fs.existsSync(canonicalSpace)) {
      console.log(`[ensure-videos] Creating ${canonicalSpace}`);
      fs.copyFileSync(`public/${found}`, canonicalSpace);
    }
  } else {
    console.warn(`[ensure-videos] Warning: Video ${i} could not be located in root or public.`);
  }

  // Ensure poster exists
  const webpPoster = `public/video-${i}-poster.webp`;
  const jpgPoster = `public/video-${i}-poster.jpg`;
  if (!fs.existsSync(webpPoster) && fs.existsSync(jpgPoster)) {
    console.log(`[ensure-videos] Duplicating ${jpgPoster} -> ${webpPoster}`);
    fs.copyFileSync(jpgPoster, webpPoster);
  }
}

// If dist directory exists, copy public video files to dist directly
if (process.argv.includes('--dist') || fs.existsSync('dist')) {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }
  const currentPublic = fs.readdirSync('public');
  currentPublic.forEach(f => {
    if (f.startsWith('video') || f.startsWith('video-') || f.startsWith('video ')) {
      const srcPath = path.join('public', f);
      const dstPath = path.join('dist', f);
      try {
        fs.copyFileSync(srcPath, dstPath);
        console.log(`[ensure-videos] Copied ${f} to dist/`);
      } catch (err) {
        console.error(`[ensure-videos] Failed copying ${f} to dist:`, err);
      }
    }
  });
}

console.log('[ensure-videos] Complete.');
