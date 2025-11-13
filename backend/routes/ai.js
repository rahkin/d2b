const express = require('express');
const router = express.Router();
const multer = require('multer');
const { AIPoints } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { uploadFromBuffer } = require('../utils/cloudinary');

const upload = multer({ storage: multer.memoryStorage() });

// Generate moodboard (already in moodboards route, but keeping for compatibility)
router.post('/moodboard', authenticateToken, async (req, res) => {
  try {
    const { prompt, style } = req.body;

    // Check AI points
    const aiPoints = await AIPoints.findOne({
      where: { userId: req.user.id }
    });

    if (!aiPoints || aiPoints.balance < 1) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient AI points'
      });
    }

    // Deduct points
    aiPoints.balance -= 1;
    aiPoints.totalUsed += 1;
    await aiPoints.save();

    // TODO: Integrate with actual AI service
    res.json({
      success: true,
      data: {
        images: [],
        colors: [],
        style: style || 'modern'
      }
    });
  } catch (error) {
    console.error('Error generating moodboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate moodboard'
    });
  }
});

// Sketch to AI Render
router.post('/sketch-to-render', authenticateToken, upload.single('sketch'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Sketch image is required'
      });
    }

    // Check AI points (sketch rendering costs more)
    const aiPoints = await AIPoints.findOne({
      where: { userId: req.user.id }
    });

    if (!aiPoints || aiPoints.balance < 3) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient AI points. Sketch rendering requires 3 points.'
      });
    }

    // Upload sketch to Cloudinary
    let sketchUrl;
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      try {
        const uploadResult = await uploadFromBuffer(req.file.buffer, {
          folder: 'd2b/sketches',
          resource_type: 'image'
        });
        sketchUrl = uploadResult.url;
      } catch (error) {
        console.error('Cloudinary upload failed:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to upload sketch'
        });
      }
    } else {
      return res.status(500).json({
        success: false,
        error: 'Image storage not configured'
      });
    }

    // Deduct points
    aiPoints.balance -= 3;
    aiPoints.totalUsed += 3;
    await aiPoints.save();

    // TODO: Send to AI service for rendering
    // For now, return mock render
    const renderUrl = sketchUrl; // In production, this would be the AI-generated render

    res.json({
      success: true,
      data: {
        sketchUrl,
        renderUrl,
        style: req.body.style || 'realistic',
        aiPointsRemaining: aiPoints.balance
      },
      message: 'Sketch rendered successfully'
    });
  } catch (error) {
    console.error('Error rendering sketch:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to render sketch'
    });
  }
});

// AI Analyzer (suggest tools, layouts)
router.post('/analyze', authenticateToken, async (req, res) => {
  try {
    const { projectId, type, data } = req.body;

    // Check AI points
    const aiPoints = await AIPoints.findOne({
      where: { userId: req.user.id }
    });

    if (!aiPoints || aiPoints.balance < 1) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient AI points'
      });
    }

    // Deduct point
    aiPoints.balance -= 1;
    aiPoints.totalUsed += 1;
    await aiPoints.save();

    // TODO: Integrate with AI analysis service
    // Mock analysis
    const analysis = {
      suggestions: [
        'Consider using moodboard creator for this project',
        'Budget tracker can help manage expenses',
        'Gantt chart recommended for timeline visualization'
      ],
      tools: ['moodboard', 'budget-tracker', 'gantt-chart'],
      estimatedBudget: {
        min: 50000,
        max: 150000,
        currency: 'PHP'
      }
    };

    res.json({
      success: true,
      data: analysis,
      aiPointsRemaining: aiPoints.balance
    });
  } catch (error) {
    console.error('Error analyzing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze'
    });
  }
});

// Get AI usage stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const aiPoints = await AIPoints.findOne({
      where: { userId: req.user.id }
    });

    if (!aiPoints) {
      return res.json({
        success: true,
        data: {
          balance: 0,
          totalEarned: 0,
          totalUsed: 0
        }
      });
    }

    res.json({
      success: true,
      data: {
        balance: aiPoints.balance,
        totalEarned: aiPoints.totalEarned,
        totalUsed: aiPoints.totalUsed,
        lastRefillDate: aiPoints.lastRefillDate
      }
    });
  } catch (error) {
    console.error('Error fetching AI stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch AI stats'
    });
  }
});

module.exports = router;
