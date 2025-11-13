/**
 * Enhanced Figma Image Extractor
 * 
 * Extracts images from Figma with proper naming based on node structure
 * 
 * Usage:
 * 1. Set FIGMA_TOKEN and FIGMA_FILE_KEY in .env
 * 2. Run: node scripts/extract-figma-images.js
 */

require('dotenv').config();
const https = require('https');
const fs = require('fs').promises;
const path = require('path');

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const OUTPUT_DIR = path.join(__dirname, '../projectDocs/figma_extract/images_labeled');
const META_OUTPUT = path.join(__dirname, '../projectDocs/figma_extract/images-mapping.json');

// Ensure output directory exists
async function ensureDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
  }
}

// Make HTTPS request to Figma API
function figmaRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e.message}`));
          }
        } else {
          reject(new Error(`Figma API returned ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download image from URL
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
        return;
      }
      
      const fileStream = require('fs').createWriteStream(filePath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

// Sanitize filename
function sanitizeFilename(name) {
  return name
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

// Build node path for naming
function buildNodePath(node, parentPath = '') {
  const currentName = node.name || 'unnamed';
  const sanitized = sanitizeFilename(currentName);
  const fullPath = parentPath ? `${parentPath}_${sanitized}` : sanitized;
  
  if (node.children && node.children.length > 0) {
    return node.children.map(child => buildNodePath(child, fullPath));
  }
  
  return fullPath;
}

// Find all nodes that can be exported as images
function findImageNodes(node, parentPath = '', imageNodes = []) {
  const nodeName = node.name || 'unnamed';
  const sanitized = sanitizeFilename(nodeName);
  const fullPath = parentPath ? `${parentPath}_${sanitized}` : sanitized;
  
  // Check if this node should be exported
  // Frames, Components, Instances, and Groups can be exported
  const exportableTypes = ['FRAME', 'COMPONENT', 'INSTANCE', 'GROUP', 'VECTOR', 'RECTANGLE', 'ELLIPSE'];
  
  if (exportableTypes.includes(node.type)) {
    // Check if it has export settings or is a frame/page
    const hasExportSettings = node.exportSettings && node.exportSettings.length > 0;
    const isPage = node.type === 'CANVAS' || node.type === 'FRAME';
    
    if (hasExportSettings || isPage) {
      imageNodes.push({
        id: node.id,
        name: nodeName,
        path: fullPath,
        type: node.type,
        exportSettings: node.exportSettings || [{ format: 'PNG', suffix: '' }]
      });
    }
  }
  
  // Recursively process children
  if (node.children) {
    node.children.forEach(child => {
      findImageNodes(child, fullPath, imageNodes);
    });
  }
  
  return imageNodes;
}

// Get image export from Figma
async function getImageExport(nodeIds) {
  const ids = nodeIds.join(',');
  const url = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${ids}&format=png&scale=2`;
  
  return figmaRequest(url);
}

// Main extraction function
async function extractFigmaImages() {
  if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
    console.error('❌ Missing FIGMA_TOKEN or FIGMA_FILE_KEY environment variables');
    console.log('\n📝 To get these:');
    console.log('1. Get Figma Personal Access Token: https://www.figma.com/developers/api#access-tokens');
    console.log('2. Get File Key from Figma URL: https://www.figma.com/file/{FILE_KEY}/...');
    console.log('3. Add to .env file:\n   FIGMA_TOKEN=your_token_here\n   FIGMA_FILE_KEY=your_file_key_here');
    process.exit(1);
  }

  console.log('🚀 Starting Figma image extraction...\n');
  console.log(`📁 File Key: ${FIGMA_FILE_KEY.substring(0, 10)}...`);
  console.log(`📂 Output Directory: ${OUTPUT_DIR}\n`);

  try {
    // Ensure output directory exists
    await ensureDirectory(OUTPUT_DIR);

    // Step 1: Get file structure
    console.log('📖 Fetching file structure from Figma...');
    const fileUrl = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;
    const fileData = await figmaRequest(fileUrl);
    
    console.log(`✅ File loaded: ${fileData.name}\n`);

    // Step 2: Find all exportable nodes
    console.log('🔍 Finding exportable nodes...');
    const imageNodes = [];
    
    if (fileData.document && fileData.document.children) {
      fileData.document.children.forEach(page => {
        if (page.type === 'CANVAS') {
          findImageNodes(page, '', imageNodes);
        }
      });
    }
    
    console.log(`✅ Found ${imageNodes.length} exportable nodes\n`);

    if (imageNodes.length === 0) {
      console.log('⚠️  No exportable nodes found. Make sure your Figma file has frames or components with export settings.');
      return;
    }

    // Step 3: Get image exports
    console.log('📥 Requesting image exports from Figma...');
    const nodeIds = imageNodes.map(node => node.id);
    const imageExport = await getImageExport(nodeIds);
    
    if (!imageExport.images || Object.keys(imageExport.images).length === 0) {
      console.log('⚠️  No images returned from Figma API');
      return;
    }

    console.log(`✅ Got ${Object.keys(imageExport.images).length} image URLs\n`);

    // Step 4: Download images with proper names
    console.log('💾 Downloading images...\n');
    const mapping = {};
    let downloaded = 0;
    let skipped = 0;

    for (const imageNode of imageNodes) {
      const imageUrl = imageExport.images[imageNode.id];
      
      if (!imageUrl) {
        console.log(`⏭️  Skipping ${imageNode.name} (no image URL)`);
        skipped++;
        continue;
      }

      // Create filename from node path
      const filename = `${imageNode.path}.png`;
      const filePath = path.join(OUTPUT_DIR, filename);

      try {
        await downloadImage(imageUrl, filePath);
        
        mapping[imageNode.id] = {
          originalId: imageNode.id,
          name: imageNode.name,
          path: imageNode.path,
          filename: filename,
          url: `/api/figma/images-labeled/${filename}`,
          type: imageNode.type
        };
        
        console.log(`✅ ${filename}`);
        downloaded++;
      } catch (error) {
        console.error(`❌ Failed to download ${imageNode.name}:`, error.message);
      }
    }

    // Step 5: Save mapping file
    await fs.writeFile(META_OUTPUT, JSON.stringify(mapping, null, 2));
    
    console.log(`\n✨ Extraction complete!`);
    console.log(`   ✅ Downloaded: ${downloaded}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📁 Output: ${OUTPUT_DIR}`);
    console.log(`   📋 Mapping: ${META_OUTPUT}`);

  } catch (error) {
    console.error('❌ Error during extraction:', error.message);
    if (error.message.includes('401')) {
      console.error('   💡 Check your FIGMA_TOKEN - it may be invalid or expired');
    } else if (error.message.includes('404')) {
      console.error('   💡 Check your FIGMA_FILE_KEY - the file may not exist or you may not have access');
    }
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  extractFigmaImages();
}

module.exports = { extractFigmaImages };



