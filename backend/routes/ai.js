const express = require('express');
const router = express.Router();

// Generate moodboard
router.post('/moodboard', async (req, res) => {
  try {
    const { description, style, budget, roomType } = req.body;

    // Mock AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock moodboard data
    const moodboard = {
      id: `mb_${Date.now()}`,
      description,
      style: style || ['modern', 'minimalist'],
      budget: budget || 50000,
      roomType: roomType || 'living-room',
      images: [
        {
          id: 'img_1',
          url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
          description: 'Modern living room with neutral colors',
          category: 'furniture'
        },
        {
          id: 'img_2',
          url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
          description: 'Minimalist interior design',
          category: 'interior'
        }
      ],
      colorPalette: [
        { name: 'Warm White', hex: '#F5F5DC', usage: 'Walls' },
        { name: 'Charcoal', hex: '#36454F', usage: 'Accent' },
        { name: 'Sage Green', hex: '#9CAF88', usage: 'Decor' }
      ],
      materials: [
        { name: 'Natural Wood', description: 'Oak or walnut for furniture', price: '₱2,500/sq.m' },
        { name: 'Marble', description: 'Carrara marble for countertops', price: '₱8,000/sq.m' }
      ],
      estimatedBudget: {
        total: budget || 50000,
        breakdown: {
          furniture: 25000,
          materials: 15000,
          labor: 8000,
          accessories: 2000
        }
      },
      createdAt: new Date(),
      status: 'completed'
    };

    res.json({
      success: true,
      message: 'Moodboard generated successfully',
      data: {
        moodboard,
        processingTime: '2.3s',
        aiModel: 'Design2Build-AI-v1.0'
      }
    });

  } catch (error) {
    console.error('Moodboard generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Moodboard generation failed'
    });
  }
});

// Render sketch
router.post('/render', async (req, res) => {
  try {
    const { image, style, resolution, lighting } = req.body;

    // Mock AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock render data
    const render = {
      id: `render_${Date.now()}`,
      originalImage: image,
      style,
      resolution: resolution || 'hd',
      lighting: lighting || 'natural',
      result: {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop',
        width: 1920,
        height: 1080,
        format: 'jpeg',
        size: '2.4MB'
      },
      metadata: {
        processingTime: '3.1s',
        aiModel: 'Sketch2Render-v2.1',
        enhancements: ['lighting', 'texture', 'perspective']
      },
      createdAt: new Date(),
      status: 'completed'
    };

    res.json({
      success: true,
      message: 'Sketch rendered successfully',
      data: {
        render,
        downloadUrl: render.result.url,
        thumbnailUrl: render.result.url.replace('w=800&h=600', 'w=400&h=300')
      }
    });

  } catch (error) {
    console.error('Sketch rendering error:', error);
    res.status(500).json({
      success: false,
      error: 'Sketch rendering failed'
    });
  }
});

// Get AI tool usage statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      totalRequests: 1247,
      todayRequests: 23,
      popularTools: [
        { name: 'Moodboard Creator', usage: 456, successRate: 98.5 },
        { name: 'Sketch Renderer', usage: 389, successRate: 95.2 }
      ],
      averageProcessingTime: {
        moodboard: '2.3s',
        render: '3.1s'
      },
      regionalUsage: {
        'PH': 85,
        'US': 8,
        'SG': 4,
        'Other': 3
      }
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch statistics'
    });
  }
});

module.exports = router; 