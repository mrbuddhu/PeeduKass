const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// FFmpeg command (available in PATH)
const ffmpegPath = 'ffmpeg';

// Define the correct order and mapping
const correctOrder = [
  {
    originalName: "Force Minor",
    artist: "Peedu Kass Momentum",
    filename: "01_force-minor_peedu-kass-momentum"
  },
  {
    originalName: "Cinema Paradiso", 
    artist: "Peedu Kass Momentum",
    filename: "02_cinema-paradiso_peedu-kass-momentum"
  },
  {
    originalName: "Kunagi läänes",
    artist: "Miljardid", 
    filename: "03_kunagi-laanes_miljardid"
  },
  {
    originalName: "Efterglow",
    artist: "Erki Pärnoja",
    filename: "04_efterglow_erki-parnoja"
  },
  {
    originalName: "Reprise: Armada",
    artist: "Peedu Kass, Raun Juurikas, Andre Maaker",
    filename: "05_reprise-armada_peedu-kass-raun-juurikas-andre-maaker"
  },
  {
    originalName: "When The Floods Are Over",
    artist: "Peedu Kass 005",
    filename: "06_when-the-floods-are-over_peedu-kass-005"
  },
  {
    originalName: "Jäälõhkuja poeg",
    artist: "European Jazz Orchestra 2011",
    filename: "07_jaaalohkuja-poeg_european-jazz-orchestra-2011"
  },
  {
    originalName: "Vihm/Haapsalu",
    artist: "Erki Pärnoja Saja lugu",
    filename: "08_vihm-haapsalu_erki-parnoja-saja-lugu"
  },
  {
    originalName: "Apple Tree",
    artist: "Anna Kaneelina",
    filename: "09_apple-tree_anna-kaneelina"
  }
];

async function compressAudio() {
  console.log('🎵 Starting audio compression with correct order...\n');
  
  // Create compressed directory if it doesn't exist
  const compressedDir = path.join(__dirname, 'public', 'uploads', 'compressed-correct');
  if (!fs.existsSync(compressedDir)) {
    fs.mkdirSync(compressedDir, { recursive: true });
  }

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  // Define the source files with their exact names
  const sourceFiles = [
    '1_Force Minor_Peedu Kass Momentum.m4a',
    '2_Cinema Paradiso_Peedu Kass Momentum.m4a', 
    '3_Kunagi laanes_Miljardid.m4a',
    '4_Efterglow_Erki Parnoja.mp3',
    '5_Reprise Armada_Peedu Kass Raun Juurikas Andre Maaker.mp3',
    '6_When The Floods Are Over_Peedu Kass 005.mp3',
    '7_Jaaalohkuja Poeg_European Jazz Orchestra.mp3',
    '8_VihmHaapsalu_Erki Parnoja Saja lugu.mp3',
    '9_Apple Tree_Anna Kaneelina.mp3'
  ];

  for (let i = 0; i < correctOrder.length; i++) {
    const track = correctOrder[i];
    const trackNumber = i + 1;
    const sourceFileName = sourceFiles[i];
    
    console.log(`📀 Processing Track ${trackNumber}: ${track.originalName} - ${track.artist}`);
    
    // Look for the source file in the AudioOriginals/Audio directory
    const sourceFile = path.join(__dirname, 'public', 'uploads', 'AudioOriginals', 'Audio', sourceFileName);
    
    if (!fs.existsSync(sourceFile)) {
      console.log(`❌ Source file not found: ${sourceFileName}`);
      continue;
    }
    
    const outputFile = path.join(compressedDir, `${track.filename}_compressed.mp3`);
    
    try {
      // Get original file size
      const originalStats = fs.statSync(sourceFile);
      const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);
      totalOriginalSize += originalStats.size;
      
      console.log(`   📁 Source: ${path.basename(sourceFile)} (${originalSizeMB} MB)`);
      
      // Compress using the same settings that worked before
      const command = `"${ffmpegPath}" -i "${sourceFile}" -codec:a libmp3lame -b:a 96k -ar 44100 -ac 2 "${outputFile}" -y`;
      
      console.log(`   🔄 Compressing to 96kbps MP3...`);
      execSync(command, { stdio: 'pipe' });
      
      // Get compressed file size
      const compressedStats = fs.statSync(outputFile);
      const compressedSizeMB = (compressedStats.size / (1024 * 1024)).toFixed(2);
      totalCompressedSize += compressedStats.size;
      
      const compressionRatio = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);
      
      console.log(`   ✅ Output: ${path.basename(outputFile)} (${compressedSizeMB} MB) - ${compressionRatio}% smaller`);
      console.log('');
      
    } catch (error) {
      console.log(`❌ Error compressing ${track.originalName}:`, error.message);
    }
  }
  
  // Summary
  const totalOriginalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const totalCompressedMB = (totalCompressedSize / (1024 * 1024)).toFixed(2);
  const overallCompression = ((1 - totalCompressedSize / totalOriginalSize) * 100).toFixed(1);
  
  console.log('📊 COMPRESSION SUMMARY:');
  console.log(`   Original total: ${totalOriginalMB} MB`);
  console.log(`   Compressed total: ${totalCompressedMB} MB`);
  console.log(`   Overall compression: ${overallCompression}%`);
  console.log(`   Vercel compatible: ${totalCompressedMB < 250 ? '✅ YES' : '❌ NO'}`);
  console.log('');
  console.log('🎵 All files compressed with clear, descriptive names!');
  console.log('📁 Check the "compressed-correct" folder for the new files.');
}

compressAudio().catch(console.error);
