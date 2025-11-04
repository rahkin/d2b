/**
 * Figma Design Extractor
 * 
 * This script helps extract design information from Figma files.
 * 
 * To use Figma API:
 * 1. Get a Figma Personal Access Token from https://www.figma.com/developers/api#access-tokens
 * 2. Get your Figma file key from the Figma file URL: https://www.figma.com/file/{FILE_KEY}/...
 * 3. Set environment variables: FIGMA_TOKEN and FIGMA_FILE_KEY
 * 
 * Alternatively, you can manually review the extracted images and update components.
 */

const fs = require('fs').promises;
const path = require('path');

const FIGMA_EXTRACT_PATH = path.join(__dirname, '../projectDocs/figma_extract');
const IMAGES_PATH = path.join(FIGMA_EXTRACT_PATH, 'images');

async function analyzeFigmaImages() {
  try {
    const files = await fs.readdir(IMAGES_PATH);
    const imageFiles = files.filter(file => {
      // Filter image files
      return file.match(/\.(png|jpg|jpeg|webp)$/i) || !file.includes('.');
    });

    console.log(`Found ${imageFiles.length} Figma design images`);
    console.log('\nTo extract design tokens from Figma:');
    console.log('1. Use Figma API (recommended) - see script comments');
    console.log('2. Manually review images at: http://localhost:3000/designs');
    console.log('3. Use Figma Dev Mode to export specs\n');

    // Check if we can use Figma API
    const hasFigmaToken = process.env.FIGMA_TOKEN;
    const hasFigmaFileKey = process.env.FIGMA_FILE_KEY;

    if (hasFigmaToken && hasFigmaFileKey) {
      console.log('✅ Figma API credentials found!');
      console.log('Run: npm run extract-figma');
      return true;
    } else {
      console.log('⚠️  Figma API credentials not found.');
      console.log('Set FIGMA_TOKEN and FIGMA_FILE_KEY environment variables to use API extraction.');
      console.log('\nAlternative: View designs at http://localhost:3000/designs and implement manually.');
      return false;
    }
  } catch (error) {
    console.error('Error analyzing Figma files:', error);
    return false;
  }
}

async function extractFromFigmaAPI() {
  const https = require('https');
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
  const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

  if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
    console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY environment variables');
    return;
  }

  const url = `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`;

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
          const figmaData = JSON.parse(data);
          extractDesignTokens(figmaData);
          resolve(figmaData);
        } else {
          console.error('Figma API Error:', res.statusCode, data);
          reject(new Error(`Figma API returned ${res.statusCode}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractDesignTokens(figmaData) {
  const tokens = {
    colors: [],
    typography: [],
    spacing: [],
    components: []
  };

  function traverseNode(node) {
    if (!node) return;

    // Extract colors
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color) {
          const color = fill.color;
          const hex = rgbToHex(color.r, color.g, color.b);
          if (!tokens.colors.find(c => c.hex === hex)) {
            tokens.colors.push({
              hex,
              r: color.r,
              g: color.g,
              b: color.b,
              opacity: fill.opacity || 1
            });
          }
        }
      });
    }

    // Extract typography
    if (node.style) {
      tokens.typography.push({
        fontFamily: node.style.fontFamily,
        fontSize: node.style.fontSize,
        fontWeight: node.style.fontWeight,
        lineHeight: node.style.lineHeightPx
      });
    }

    // Extract spacing (padding, gap, etc.)
    if (node.paddingLeft || node.paddingRight || node.paddingTop || node.paddingBottom) {
      tokens.spacing.push({
        paddingLeft: node.paddingLeft,
        paddingRight: node.paddingRight,
        paddingTop: node.paddingTop,
        paddingBottom: node.paddingBottom
      });
    }

    // Recursively traverse children
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(child => traverseNode(child));
    }
  }

  if (figmaData.document) {
    traverseNode(figmaData.document);
  }

  // Save extracted tokens
  const outputPath = path.join(__dirname, '../design-tokens.json');
  require('fs').writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
  console.log(`✅ Design tokens extracted to: ${outputPath}`);
  console.log(`   Colors: ${tokens.colors.length}`);
  console.log(`   Typography: ${tokens.typography.length}`);
  console.log(`   Spacing: ${tokens.spacing.length}`);

  return tokens;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// Run analysis
if (require.main === module) {
  analyzeFigmaImages().then(hasAPI => {
    if (hasAPI) {
      extractFromFigmaAPI().catch(console.error);
    }
  });
}

module.exports = { analyzeFigmaImages, extractFromFigmaAPI };

