const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const FIGMA_EXTRACT_PATH = path.join(__dirname, '../../projectDocs/figma_extract');
const IMAGES_PATH = path.join(FIGMA_EXTRACT_PATH, 'images');
const LABELED_IMAGES_PATH = path.join(FIGMA_EXTRACT_PATH, 'images_labeled');

// Serve Figma metadata
router.get('/meta', async (req, res) => {
  try {
    const metaPath = path.join(FIGMA_EXTRACT_PATH, 'meta.json');
    const metaData = await fs.readFile(metaPath, 'utf-8');
    const meta = JSON.parse(metaData);
    
    res.json({
      success: true,
      data: meta
    });
  } catch (error) {
    console.error('Error reading Figma metadata:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load Figma metadata'
    });
  }
});

// List all Figma images
router.get('/images', async (req, res) => {
  try {
    const files = await fs.readdir(IMAGES_PATH);
    const imageFiles = files.filter(file => {
      // Filter out any non-image files (though these should all be images)
      return true;
    });
    
    res.json({
      success: true,
      data: {
        images: imageFiles,
        count: imageFiles.length,
        basePath: '/api/figma/images'
      }
    });
  } catch (error) {
    console.error('Error listing Figma images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list Figma images'
    });
  }
});

// Serve individual Figma image
router.get('/images/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const imagePath = path.join(IMAGES_PATH, imageId);
    
    // Check if file exists
    try {
      await fs.access(imagePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    // Set appropriate content type
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Stream the file
    const fileStream = require('fs').createReadStream(imagePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving Figma image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to serve image'
    });
  }
});

// Serve thumbnail
router.get('/thumbnail', async (req, res) => {
  try {
    const thumbnailPath = path.join(FIGMA_EXTRACT_PATH, 'thumbnail.png');
    
    // Check if file exists
    try {
      await fs.access(thumbnailPath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Thumbnail not found'
      });
    }
    
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    const fileStream = require('fs').createReadStream(thumbnailPath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving thumbnail:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to serve thumbnail'
    });
  }
});

// Get Figma design info
router.get('/info', async (req, res) => {
  try {
    const metaPath = path.join(FIGMA_EXTRACT_PATH, 'meta.json');
    const metaData = await fs.readFile(metaPath, 'utf-8');
    const meta = JSON.parse(metaData);
    
    const files = await fs.readdir(IMAGES_PATH);
    
    res.json({
      success: true,
      data: {
        fileName: meta.file_name || 'D2B Final Design',
        thumbnail: '/api/figma/thumbnail',
        imageCount: files.length,
        images: files.map(file => ({
          id: file,
          url: `/api/figma/images/${file}`,
          name: file
        })),
        metadata: meta
      }
    });
  } catch (error) {
    console.error('Error getting Figma info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load Figma design info'
    });
  }
});

// Serve labeled images with proper names
router.get('/images-labeled/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(LABELED_IMAGES_PATH, filename);
    
    // Check if file exists
    try {
      await fs.access(imagePath);
    } catch {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }
    
    // Set appropriate content type
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    
    // Stream the file
    const fileStream = require('fs').createReadStream(imagePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error serving labeled Figma image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to serve image'
    });
  }
});

// Get images mapping
router.get('/images-mapping', async (req, res) => {
  try {
    const mappingPath = path.join(FIGMA_EXTRACT_PATH, 'images-mapping.json');
    const mappingData = await fs.readFile(mappingPath, 'utf-8');
    const mapping = JSON.parse(mappingData);
    
    res.json({
      success: true,
      data: mapping
    });
  } catch (error) {
    console.error('Error reading images mapping:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load images mapping'
    });
  }
});

// List labeled images
router.get('/images-labeled', async (req, res) => {
  try {
    const files = await fs.readdir(LABELED_IMAGES_PATH);
    const imageFiles = files.filter(file => file.match(/\.(png|jpg|jpeg|webp)$/i));
    
    res.json({
      success: true,
      data: {
        images: imageFiles.map(file => ({
          filename: file,
          url: `/api/figma/images-labeled/${file}`
        })),
        count: imageFiles.length
      }
    });
  } catch (error) {
    console.error('Error listing labeled images:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list labeled images'
    });
  }
});

module.exports = router;

