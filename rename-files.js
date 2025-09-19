const fs = require('fs');
const path = require('path');

const renameFile = (oldName, newName) => {
  const oldPath = path.join('public/uploads', oldName);
  const newPath = path.join('public/uploads', newName);
  
  try {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${oldName} → ${newName}`);
    } else {
      console.log(`❌ File not found: ${oldName}`);
    }
  } catch (error) {
    console.error(`❌ Error renaming ${oldName}:`, error.message);
  }
};

console.log('🔄 Renaming files with special characters...');

// Rename the problematic files
renameFile('Kunagi Läänes_Miljardid.jpg', 'Kunagi_Laanes_Miljardid.jpg');
renameFile('Saja lugu_Erki Pärnoja.jpeg', 'Saja_lugu_Erki_Parnoja.jpeg');

console.log('🎉 File renaming complete!');
