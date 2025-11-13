const express = require('express');
const router = express.Router();
const { Moodboard, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { AIPoints } = require('../models');

// Get all moodboards for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const moodboards = await Moodboard.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: moodboards
    });
  } catch (error) {
    console.error('Error fetching moodboards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch moodboards'
    });
  }
});

// Get public moodboards
router.get('/public', async (req, res) => {
  try {
    const moodboards = await Moodboard.findAll({
      where: { isPublic: true },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    res.json({
      success: true,
      data: moodboards
    });
  } catch (error) {
    console.error('Error fetching public moodboards:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch public moodboards'
    });
  }
});

// Get moodboard templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await Moodboard.findAll({
      where: { isTemplate: true },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch templates'
    });
  }
});

// Get single moodboard
router.get('/:id', async (req, res) => {
  try {
    const moodboard = await Moodboard.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }]
    });

    if (!moodboard) {
      return res.status(404).json({
        success: false,
        error: 'Moodboard not found'
      });
    }

    // Check if user has access (owner or public)
    if (moodboard.userId !== req.user?.id && !moodboard.isPublic) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: moodboard
    });
  } catch (error) {
    console.error('Error fetching moodboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch moodboard'
    });
  }
});

// Create moodboard
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, images, colors, style, isTemplate, isPublic, collectionId } = req.body;

    const moodboard = await Moodboard.create({
      userId: req.user.id,
      title,
      description,
      images: images || [],
      colors: colors || [],
      style,
      isTemplate: isTemplate || false,
      isPublic: isPublic || false,
      collectionId,
      aiGenerated: false
    });

    res.status(201).json({
      success: true,
      data: moodboard,
      message: 'Moodboard created successfully'
    });
  } catch (error) {
    console.error('Error creating moodboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create moodboard'
    });
  }
});

// Generate AI moodboard
router.post('/ai-generate', authenticateToken, async (req, res) => {
  try {
    const { prompt, style } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    // Check AI points
    const aiPoints = await AIPoints.findOne({
      where: { userId: req.user.id }
    });

    if (!aiPoints || aiPoints.balance < 1) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient AI points. Please upgrade your subscription.'
      });
    }

    // Deduct AI point
    aiPoints.balance -= 1;
    aiPoints.totalUsed += 1;
    await aiPoints.save();

    // TODO: Integrate with actual AI service (OpenAI, Stable Diffusion, etc.)
    // For now, return mock generated moodboard
    const generatedMoodboard = {
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800'
      ],
      colors: ['#8b5e3c', '#f5f0eb', '#d4c0a8', '#5c4033'],
      style: style || 'modern',
      estimatedBudget: {
        min: 50000,
        max: 150000,
        currency: 'PHP'
      }
    };

    // Save the generated moodboard
    const moodboard = await Moodboard.create({
      userId: req.user.id,
      title: `AI Generated: ${prompt.substring(0, 50)}`,
      description: `AI-generated moodboard based on: ${prompt}`,
      images: generatedMoodboard.images,
      colors: generatedMoodboard.colors,
      style: generatedMoodboard.style,
      aiGenerated: true,
      aiPrompt: prompt,
      isPublic: false
    });

    res.json({
      success: true,
      data: {
        moodboard,
        generated: generatedMoodboard,
        aiPointsRemaining: aiPoints.balance
      },
      message: 'Moodboard generated successfully'
    });
  } catch (error) {
    console.error('Error generating AI moodboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate moodboard'
    });
  }
});

// Update moodboard
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const moodboard = await Moodboard.findByPk(req.params.id);

    if (!moodboard) {
      return res.status(404).json({
        success: false,
        error: 'Moodboard not found'
      });
    }

    if (moodboard.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const { title, description, images, colors, style, isPublic, collectionId } = req.body;

    if (title) moodboard.title = title;
    if (description !== undefined) moodboard.description = description;
    if (images) moodboard.images = images;
    if (colors) moodboard.colors = colors;
    if (style) moodboard.style = style;
    if (isPublic !== undefined) moodboard.isPublic = isPublic;
    if (collectionId !== undefined) moodboard.collectionId = collectionId;

    await moodboard.save();

    res.json({
      success: true,
      data: moodboard,
      message: 'Moodboard updated successfully'
    });
  } catch (error) {
    console.error('Error updating moodboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update moodboard'
    });
  }
});

// Delete moodboard
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const moodboard = await Moodboard.findByPk(req.params.id);

    if (!moodboard) {
      return res.status(404).json({
        success: false,
        error: 'Moodboard not found'
      });
    }

    if (moodboard.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    await moodboard.destroy();

    res.json({
      success: true,
      message: 'Moodboard deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting moodboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete moodboard'
    });
  }
});

module.exports = router;




