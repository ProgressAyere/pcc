const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'logo2.jpeg');
const outputDir = path.join(__dirname, 'public');

async function resizeLogos() {
  try {
    // Generate 192x192 logo
    await sharp(inputPath)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(outputDir, 'logo192.png'));
    console.log('✓ logo192.png created successfully');

    // Generate 512x512 logo
    await sharp(inputPath)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(outputDir, 'logo512.png'));
    console.log('✓ logo512.png created successfully');

    console.log('\nLogos generated successfully!');
  } catch (error) {
    console.error('Error generating logos:', error.message);
  }
}

resizeLogos();
