const express = require('express');
const router = express.Router();
const { User, Subscription, AIPoints } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Get current user's subscription
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id },
      include: [{ model: User, as: 'user' }]
    });

    if (!subscription) {
      // Create default freemium subscription if none exists
      const newSubscription = await Subscription.create({
        userId: req.user.id,
        tier: 'freemium',
        status: 'active',
        monthlyPrice: 0,
        currency: 'PHP'
      });

      // Initialize AI points
      await AIPoints.create({
        userId: req.user.id,
        balance: 10, // Freemium gets 10 AI points
        totalEarned: 10
      });

      return res.json({
        success: true,
        data: newSubscription
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription'
    });
  }
});

// Get all subscription tiers
router.get('/tiers', async (req, res) => {
  try {
    const tiers = Subscription.getAllTiers();
    res.json({
      success: true,
      data: tiers
    });
  } catch (error) {
    console.error('Error fetching tiers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription tiers'
    });
  }
});

// Upgrade subscription
router.post('/upgrade', authenticateToken, async (req, res) => {
  try {
    const { tier } = req.body;
    const validTiers = ['freemium', 'pro', 'pro-plus', 'enterprise'];
    
    if (!validTiers.includes(tier)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid subscription tier'
      });
    }

    const tierInfo = Subscription.getTierFeatures(tier);
    
    let subscription = await Subscription.findOne({
      where: { userId: req.user.id }
    });

    if (!subscription) {
      subscription = await Subscription.create({
        userId: req.user.id,
        tier: tier,
        status: 'active',
        monthlyPrice: tierInfo.monthlyPrice,
        currency: 'PHP'
      });
    } else {
      subscription.tier = tier;
      subscription.status = 'active';
      subscription.monthlyPrice = tierInfo.monthlyPrice;
      subscription.startDate = new Date();
      subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
      await subscription.save();
    }

    // Update AI points based on tier
    const aiPoints = await AIPoints.findOne({
      where: { userId: req.user.id }
    });

    if (aiPoints) {
      // Add points based on tier
      const pointsToAdd = tierInfo.features.aiPoints - aiPoints.balance;
      if (pointsToAdd > 0) {
        aiPoints.balance += pointsToAdd;
        aiPoints.totalEarned += pointsToAdd;
        await aiPoints.save();
      }
    } else {
      await AIPoints.create({
        userId: req.user.id,
        balance: tierInfo.features.aiPoints,
        totalEarned: tierInfo.features.aiPoints
      });
    }

    res.json({
      success: true,
      data: subscription,
      message: `Successfully upgraded to ${tierInfo.name} tier`
    });
  } catch (error) {
    console.error('Error upgrading subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upgrade subscription'
    });
  }
});

// Cancel subscription
router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { userId: req.user.id }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }

    subscription.status = 'cancelled';
    subscription.autoRenew = false;
    await subscription.save();

    res.json({
      success: true,
      data: subscription,
      message: 'Subscription cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel subscription'
    });
  }
});

module.exports = router;

