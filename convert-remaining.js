const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Remaining images to convert
const remainingImages = [
  'public/Discographythumbnails/Discography thumbnails/Ma luban, et ma muutun_Miljardid.jpg',
  'public/Discographythumbnails/Discography thumbnails/Peedu Kass Momentum_Peedu Kass Momentum.jpg',
  'public/Discographythumbnails/Discography thumbnails/Anna Kaneelina_Anna Kaneelina.jpg',
  'public/Discographythumbnails/Discography thumbnails/Armada_Peedu Kass Raun Juurikas Andre Maaker.jpg',
  'public/Discographythumbnails/Discography thumbnails/Imeline_Miljardid.jpg',
  'public/Discographythumbnails/Discography thumbnails/Saja lugu_Erki Pärnoja.jpeg',
  'public/Discographythumbnails/Discography thumbnails/Home_Peedu Kass 005.jpg',
  'public/Discographythumbnails/Discography thumbnails/Baltic Sketches_Tree Stones Quartet.jpg',
  'public/Discographythumbnails/Discography thumbnails/Kunagi Läänes_Miljardid.jpg',
  'public/uploads/1758262892987-2_solo.jpg',
  'public/uploads/1758265875027-7.jpg',
  'public/uploads/1758265880511-8.jpg'
];

console.log('🔄 Converting remaining images to WebP...\n');

let converted = 0;
let totalSize = 0;

remainingImages.forEach(imagePath => {
  if (fs.existsSync(imagePath)) {
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(ext, '.webp');
    
    // Check if WebP already exists
    if (fs.existsSync(webpPath)) {
      console.log(`⚠️  WebP already exists: ${path.basename(imagePath)}`);
      return;
    }
    
    const originalSize = fs.statSync(imagePath).size;
    
    sharp(imagePath)
      .webp({ quality: 80 })
      .toFile(webpPath)
      .then(() => {
        const newSize = fs.statSync(webpPath).size;
        const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${path.basename(imagePath)} → ${path.basename(webpPath)} (${reduction}% smaller)`);
        converted++;
        totalSize += newSize;
        
        if (converted === remainingImages.filter(p => fs.existsSync(p) && !fs.existsSync(p.replace(path.extname(p), '.webp'))).length) {
          console.log(`\n🎉 Conversion complete!`);
          console.log(`📊 Total WebP size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
        }
      })
      .catch(err => {
        console.error(`❌ Error converting ${imagePath}:`, err.message);
      });
  } else {
    console.log(`⚠️  File not found: ${imagePath}`);
  }
});
