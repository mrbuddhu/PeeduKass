const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const convertImage = async (inputPath, outputName) => {
  try {
    if (fs.existsSync(inputPath)) {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(`public/uploads/${outputName}`);
      console.log(`✅ Converted: ${path.basename(inputPath)} → ${outputName}`);
    } else {
      console.log(`❌ File not found: ${inputPath}`);
    }
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
};

const convertMissingImages = async () => {
  console.log('🔄 Converting missing discography images...');
  
  // Convert the images with special characters to simple names
  await convertImage('public/uploads/Kunagi Läänes_Miljardid.jpg', 'Kunagi_Laanes_Miljardid.webp');
  await convertImage('public/uploads/Saja lugu_Erki Pärnoja.jpeg', 'Saja_lugu_Erki_Parnoja.webp');
  
  // Also create Efterglow from existing image
  await convertImage('public/uploads/Saja lugu_Erki Pärnoja.jpeg', 'Efterglow_Erki_Parnoja.webp');
  
  console.log('🎉 Missing discography images converted!');
};

convertMissingImages();
