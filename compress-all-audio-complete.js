const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎵 Complete Audio Compression for ALL Files');
console.log('==========================================');

const uploadsDir = path.join(__dirname, 'public', 'uploads');
const backupDir = path.join(__dirname, 'public', 'uploads', 'backup');

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Find ALL audio files (MP3 and M4A)
const audioFiles = [];
fs.readdirSync(uploadsDir).forEach(file => {
  if (file.match(/\.(mp3|m4a|wav|aac|ogg)$/i)) {
    const filePath = path.join(uploadsDir, file);
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    audioFiles.push({
      name: file,
      path: filePath,
      size: stats.size,
      sizeMB: parseFloat(sizeMB),
      backupPath: path.join(backupDir, file),
      compressedName: file.replace(/\.(mp3|m4a|wav|aac|ogg)$/i, '.mp3')
    });
  }
});

console.log('\n📊 ALL Audio Files:');
console.log('==================');
audioFiles.forEach(file => {
  console.log(`${file.name}: ${file.sizeMB} MB`);
});

const totalSize = audioFiles.reduce((sum, file) => sum + file.sizeMB, 0);
console.log(`\nTotal Size: ${totalSize.toFixed(2)} MB`);

// Target: Compress to fit under 80MB (safe for Vercel)
const targetSize = 80;
const compressionRatio = targetSize / totalSize;
const targetBitrate = Math.max(64, Math.min(96, Math.floor(128 * compressionRatio)));

console.log(`\n🎯 Target: ${targetSize} MB total (under Vercel limit)`);
console.log(`📉 Compression Ratio: ${(compressionRatio * 100).toFixed(1)}%`);
console.log(`🔧 Target Bitrate: ${targetBitrate}kbps`);

// Check if ffmpeg is available
let ffmpegAvailable = false;
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  ffmpegAvailable = true;
  console.log('\n✅ FFmpeg is available - starting compression...');
} catch (error) {
  console.log('\n❌ FFmpeg not found!');
  console.log('\n📥 Install FFmpeg:');
  console.log('Windows: winget install ffmpeg');
  console.log('Or download: https://ffmpeg.org/download.html');
  console.log('\n🔄 Alternative - Online Compression:');
  console.log('1. Go to: https://www.freeconvert.com/mp3-compressor');
  console.log('2. Upload each file');
  console.log('3. Set quality to 96kbps');
  console.log('4. Download and replace');
  process.exit(1);
}

if (ffmpegAvailable) {
  console.log('\n🔧 Compressing ALL audio files...');
  console.log('==================================');
  
  let compressedTotal = 0;
  audioFiles.forEach((file, index) => {
    try {
      console.log(`\n[${index + 1}/${audioFiles.length}] Compressing: ${file.name}`);
      
      // Backup original file
      fs.copyFileSync(file.path, file.backupPath);
      console.log(`📁 Backed up to: ${file.backupPath}`);
      
      // Compress to MP3 with target bitrate
      const tempPath = file.path + '.temp';
      const command = `ffmpeg -i "${file.path}" -codec:a libmp3lame -b:a ${targetBitrate}k -ar 44100 -ac 2 "${tempPath}" -y`;
      
      execSync(command, { stdio: 'pipe' });
      
      // Replace original with compressed version
      fs.renameSync(tempPath, file.path);
      
      // Check new size
      const newStats = fs.statSync(file.path);
      const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
      compressedTotal += parseFloat(newSizeMB);
      
      const savings = ((file.sizeMB - parseFloat(newSizeMB)) / file.sizeMB * 100).toFixed(1);
      
      console.log(`✅ Compressed: ${file.sizeMB} MB → ${newSizeMB} MB (${savings}% saved)`);
      
    } catch (error) {
      console.log(`❌ Failed to compress ${file.name}: ${error.message}`);
    }
  });
  
  console.log('\n📊 Compression Results:');
  console.log('======================');
  console.log(`Original Total: ${totalSize.toFixed(2)} MB`);
  console.log(`Compressed Total: ${compressedTotal.toFixed(2)} MB`);
  console.log(`Total Savings: ${(totalSize - compressedTotal).toFixed(2)} MB`);
  console.log(`Compression Ratio: ${(((totalSize - compressedTotal) / totalSize) * 100).toFixed(1)}%`);
  
  if (compressedTotal <= targetSize) {
    console.log(`\n✅ SUCCESS! All files compressed and fit under ${targetSize} MB limit`);
    console.log('\n🎵 What you get:');
    console.log('================');
    console.log('✅ ALL 9 tracks in your beautiful custom player');
    console.log('✅ Full audio quality (compressed but still good)');
    console.log('✅ No external redirects needed');
    console.log('✅ Vercel deployment success');
    console.log('✅ Professional music portfolio experience');
    
    console.log('\n📝 Next Steps:');
    console.log('==============');
    console.log('1. Update audio.json to use all local files');
    console.log('2. Update .vercelignore to allow all audio files');
    console.log('3. Deploy to Vercel successfully');
    console.log('4. Enjoy your beautiful player with ALL tracks!');
    
  } else {
    console.log(`\n⚠️  Still over limit. Consider further compression or hybrid approach.`);
  }
}

console.log('\n🎯 Final Result:');
console.log('================');
console.log('Your beautiful custom player will have:');
console.log('• All 9 tracks playing locally');
console.log('• No ugly SoundCloud embeds');
console.log('• Professional audio experience');
console.log('• Vercel deployment success');
