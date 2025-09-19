const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const files = [
  'public/uploads/Kunagi Läänes_Miljardid.jpg',
  'public/uploads/Saja lugu_Erki Pärnoja.jpeg'
];

console.log('Converting missing images...');

files.forEach(file => {
  if (fs.existsSync(file)) {
    const webpFile = file.replace(/\.(jpg|jpeg)$/, '.webp');
    console.log(`Converting: ${path.basename(file)}`);
    
    sharp(file)
      .webp({ quality: 80 })
      .toFile(webpFile)
      .then(() => {
        console.log(`✅ Converted: ${path.basename(file)} → ${path.basename(webpFile)}`);
        // Remove original file
        fs.unlinkSync(file);
        console.log(`🗑️ Removed: ${path.basename(file)}`);
      })
      .catch(err => {
        console.error(`❌ Error converting ${file}:`, err.message);
      });
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});
