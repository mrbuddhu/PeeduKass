const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to convert image to WebP
function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    // Use sharp for conversion (more reliable than cwebp)
    const sharp = require('sharp');
    
    sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath)
      .then(() => {
        const originalSize = fs.statSync(inputPath).size;
        const newSize = fs.statSync(outputPath).size;
        const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${reduction}% smaller)`);
      })
      .catch(err => {
        console.error(`❌ Error converting ${inputPath}:`, err.message);
      });
  } catch (error) {
    console.error(`❌ Sharp not available, skipping ${inputPath}`);
  }
}

// Large images to convert (over 1MB)
const largeImages = [
  'public/bio/1_Harri_Rospu.JPG',
  'public/bio/2_Harri_Rospu.JPG', 
  'public/bio/2_photo_by_Harri_Rospu.JPG',
  'public/bio/3_Krõõt_Tarkmeel.JPG',
  'public/uploads/1758265854111-4.jpg',
  'public/uploads/1758265848488-4.jpg',
  'public/uploads/1758265829938-1.jpg',
  'public/bio/7_Martin_Heinmets.jpg',
  'public/uploads/1758262903997-3_miljardid.jpg',
  'public/bio/6_Kaupo_Kikkas.jpg',
  'public/uploads/1758265835769-2.jpg',
  'public/bio/8_Martin_Heinmets.jpg',
  'public/bio/3_photo_by_Martin_Heinmets.jpg',
  'public/bio/4_Martin_Heinmets.jpg',
  'public/uploads/1758262868548-1_kasstalsisinkminn.jpg',
  'public/bio/5_Stina_Kase.jpeg',
  'public/Discographythumbnails/Discography thumbnails/Ood metsale_Joel Remmel Peedu Kass.jpg',
  'public/Discographythumbnails/Discography thumbnails/Efterglow_Erki Pärnoja.png',
  'public/uploads/1758265862683-5.jpg',
  'public/uploads/1758265868671-6.jpg',
  'public/uploads/wmx25_Kass-Talsi-Minn_Northern_Connections_post_1080x1350.png',
  'public/uploads/1758262914631-4_funkifize.jpg',
  'public/uploads/1758265841028-3.jpg',
  'public/Discographythumbnails/Discography thumbnails/Ma luban, et ma muutun_Miljardid.jpg',
  'public/Discographythumbnails/Discography thumbnails/Peedu Kass Momentum_Peedu Kass Momentum.jpg',
  'public/uploads/1758262892987-2_solo.jpg',
  'public/Discographythumbnails/Discography thumbnails/Anna Kaneelina_Anna Kaneelina.jpg',
  'public/uploads/1758265880511-8.jpg',
  'public/uploads/ood metsale mockup.jpeg',
  'public/bio/1_photo_by_Martin_Heinmets.jpg',
  'public/Discographythumbnails/Discography thumbnails/Armada_Peedu Kass Raun Juurikas Andre Maaker.jpg',
  'public/Discographythumbnails/Discography thumbnails/Imeline_Miljardid.jpg',
  'public/uploads/1758265875027-7.jpg',
  'public/Discographythumbnails/Discography thumbnails/Saja lugu_Erki Pärnoja.jpeg',
  'public/uploads/musician-bassist-performance-stage.jpg',
  'public/Discographythumbnails/Discography thumbnails/Baltic Sketches_Tree Stones Quartet.jpg',
  'public/Discographythumbnails/Discography thumbnails/Home_Peedu Kass 005.jpg',
  'public/Discographythumbnails/Discography thumbnails/Kunagi Läänes_Miljardid.jpg'
];

console.log('🔄 Converting large images to WebP...\n');

// Convert each image
largeImages.forEach(imagePath => {
  if (fs.existsSync(imagePath)) {
    const ext = path.extname(imagePath);
    const webpPath = imagePath.replace(ext, '.webp');
    convertToWebP(imagePath, webpPath);
  } else {
    console.log(`⚠️  File not found: ${imagePath}`);
  }
});

console.log('\n🎉 Conversion complete!');
console.log('📝 Next: Update JSON files to use .webp extensions');
