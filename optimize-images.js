import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const assetsDir = path.resolve('./src/assets');

console.log('🖼️  Starting image optimization...\n');

const imagesToCompress = [
  'logo.png',
  'icon.png',
  'grid.png',
  'curlybracket.png',
  'illustrater.webp'
];

imagesToCompress.forEach(file => {
  const filePath = path.join(assetsDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file} not found, skipping...`);
    return;
  }

  const ext = path.extname(file).toLowerCase();
  const baseName = path.basename(file, ext);
  
  try {
    if (ext === '.png') {
      // PNG optimization
      console.log(`📦 Compressing ${file}...`);
      execSync(
        `pngquant --quality 80-90 --speed 10 --force --output "${filePath}.tmp" "${filePath}"`,
        { stdio: 'pipe' }
      );
      fs.renameSync(`${filePath}.tmp`, filePath);
      const newSize = fs.statSync(filePath).size / 1024;
      console.log(`   ✓ Optimized to ${newSize.toFixed(0)}KB\n`);
    } else if (ext === '.webp') {
      // WebP optimization
      console.log(`📦 Compressing ${file}...`);
      execSync(
        `cwebp -q 80 -m 6 "${filePath}" -o "${filePath}.tmp"`,
        { stdio: 'pipe' }
      );
      fs.renameSync(`${filePath}.tmp`, filePath);
      const newSize = fs.statSync(filePath).size / 1024;
      console.log(`   ✓ Optimized to ${newSize.toFixed(0)}KB\n`);
    }
  } catch (error) {
    console.log(`⚠️  Could not optimize ${file} - tools not installed\n`);
    console.log('   To optimize images, install: pngquant and cwebp\n');
  }
});

console.log('✓ Image optimization complete!');
console.log('\nTo install image tools:');
console.log('  macOS: brew install pngquant libwebp');
console.log('  Ubuntu: sudo apt-get install pngquant webp');
console.log('  Windows: Download from https://imagemagick.org/');
