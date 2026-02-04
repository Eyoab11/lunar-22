const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Brochure image paths
const brochureImages = [
  'Lunar 22_Digital Brochure_Feb 02-1_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-2_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-3_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-4_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-5_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-6_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-7_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-8_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-9_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-10_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-11_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-12_page-0001.jpg',
  'Lunar 22_Digital Brochure_Feb 02-13_page-0001.jpg',
];

const publicDir = path.join(__dirname, '..', 'public');
const optimizedDir = path.join(publicDir, 'optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImages() {
  console.log('🖼️  Starting brochure image optimization for Safari...');
  
  for (let i = 0; i < brochureImages.length; i++) {
    const imageName = brochureImages[i];
    const inputPath = path.join(publicDir, imageName);
    const outputPath = path.join(optimizedDir, imageName);
    
    try {
      if (fs.existsSync(inputPath)) {
        console.log(`📸 Optimizing ${imageName}...`);
        
        await sharp(inputPath)
          .jpeg({
            quality: 85,
            progressive: false, // Disable progressive for Safari
            mozjpeg: true,
          })
          .resize(1200, 1600, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toFile(outputPath);
          
        console.log(`✅ Optimized ${imageName}`);
      } else {
        console.log(`⚠️  Image not found: ${imageName}`);
      }
    } catch (error) {
      console.error(`❌ Error optimizing ${imageName}:`, error);
    }
  }
  
  console.log('🎉 Brochure image optimization complete!');
}

// Run if called directly
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };