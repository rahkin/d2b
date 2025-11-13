const express = require('express');
const router = express.Router();
const { Ad, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');

// Ad package pricing (from PRD)
const AD_PACKAGES = {
  basic: {
    name: 'Basic',
    monthlyPrice: 12997.80,
    impressions: 900,
    features: ['AI Analyzer', 'Search', 'Interstitials']
  },
  standard: {
    name: 'Standard',
    monthlyPrice: 20827.80,
    impressions: 1200,
    features: ['Splash', 'Native Ads', 'Forum']
  },
  premium: {
    name: 'Premium',
    monthlyPrice: 60813.00,
    impressions: 3000,
    features: ['Retargeting', 'Sponsored Content']
  },
  platinum: {
    name: 'Platinum',
    monthlyPrice: 178263.00,
    impressions: -1, // unlimited
    features: ['Video Ads', 'Featured Campaigns']
  }
};

// Get ads for display (public)
router.get('/display', async (req, res) => {
  try {
    const { placement, location } = req.query;

    const where = {
      status: 'active',
      startDate: { [Op.lte]: new Date() },
      endDate: { [Op.gte]: new Date() }
    };

    if (placement) {
      where.placement = placement;
    }

    // Get active ads
    const ads = await Ad.findAll({
      where,
      include: [{
        model: User,
        as: 'vendor',
        attributes: ['id', 'name', 'company', 'avatar']
      }],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: ads
    });
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ads'
    });
  }
});

// Get vendor's ads
router.get('/my-ads', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({
        success: false,
        error: 'Only vendors can manage ads'
      });
    }

    const ads = await Ad.findAll({
      where: { vendorId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: ads
    });
  } catch (error) {
    console.error('Error fetching vendor ads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch ads'
    });
  }
});

// Get ad packages
router.get('/packages', async (req, res) => {
  try {
    res.json({
      success: true,
      data: AD_PACKAGES
    });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch packages'
    });
  }
});

// Create ad
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({
        success: false,
        error: 'Only vendors can create ads'
      });
    }

    const { package: packageType, title, content, images, placement, startDate, endDate, geotags, targetAudience } = req.body;

    if (!packageType || !placement || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Package, placement, start date, and end date are required'
      });
    }

    const packageInfo = AD_PACKAGES[packageType];
    if (!packageInfo) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ad package'
      });
    }

    const ad = await Ad.create({
      vendorId: req.user.id,
      package: packageType,
      title,
      content,
      images: images || [],
      placement,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      monthlyPrice: packageInfo.monthlyPrice,
      currency: 'PHP',
      geotags,
      targetAudience,
      status: 'draft'
    });

    res.status(201).json({
      success: true,
      data: ad,
      message: 'Ad created successfully'
    });
  } catch (error) {
    console.error('Error creating ad:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create ad'
    });
  }
});

// Track ad impression
router.post('/:id/impression', async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    
    if (ad && ad.status === 'active') {
      ad.impressions += 1;
      await ad.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking impression:', error);
    res.json({ success: false });
  }
});

// Track ad click
router.post('/:id/click', async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    
    if (ad && ad.status === 'active') {
      ad.clicks += 1;
      await ad.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking click:', error);
    res.json({ success: false });
  }
});

module.exports = router;




