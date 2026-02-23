const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const assetsDir = path.join(__dirname, 'src', 'assets');
const sizeThresholdMB = 0.5;

function getFileSizeMB(filePath) {
  return fs.statSync(filePath).size / (1024 * 1024);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function optimizeImage(filePath) {
  const sizeBefore = getFileSizeMB(filePath);
  const tempPath = filePath + '.tmp';
  
  try {
    execSync(`npx sharp-cli -i "${filePath}" -o "${tempPath}" --quality 80 --progressive`, { stdio: 'inherit' });
    
    const sizeAfter = getFileSizeMB(tempPath);
    if (sizeAfter < sizeBefore) {
      fs.renameSync(tempPath, filePath);
      console.log(`✓ ${path.basename(filePath)}: ${sizeBefore.toFixed(2)}MB → ${sizeAfter.toFixed(2)}MB`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`⊘ ${path.basename(filePath)}: Already optimized`);
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`✗ ${path.basename(filePath)}: ${error.message}`);
  }
}

function optimizeVideo(filePath) {
  const sizeBefore = getFileSizeMB(filePath);
  const tempPath = filePath + '.tmp.mp4';
  const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
  
  try {
    execSync(`"${ffmpegPath}" -i "${filePath}" -vcodec libx264 -crf 28 -preset medium "${tempPath}"`, { stdio: 'inherit' });
    
    const sizeAfter = getFileSizeMB(tempPath);
    if (sizeAfter < sizeBefore) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      console.log(`✓ ${path.basename(filePath)}: ${sizeBefore.toFixed(2)}MB → ${sizeAfter.toFixed(2)}MB`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`⊘ ${path.basename(filePath)}: Already optimized`);
    }
  } catch (error) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`✗ ${path.basename(filePath)}: ${error.message}`);
  }
}

console.log('Scanning assets folder...\n');

const allFiles = getAllFiles(assetsDir);
const imageExts = ['.jpg', '.jpeg', '.png'];
const videoExts = ['.mp4', '.mov', '.avi'];

allFiles.forEach(filePath => {
  const ext = path.extname(filePath).toLowerCase();
  const sizeMB = getFileSizeMB(filePath);
  
  if (sizeMB >= sizeThresholdMB) {
    if (imageExts.includes(ext)) {
      optimizeImage(filePath);
    } else if (videoExts.includes(ext)) {
      optimizeVideo(filePath);
    }
  }
});

console.log('\nOptimization complete!');
