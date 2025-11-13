const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { User, Subscription, AIPoints } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Validation middleware
const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('role').isIn(['client', 'designer', 'vendor', 'contractor', 'project-manager', 'student', 'diyer']).withMessage('Invalid role'),
  body('phone').optional().matches(/^\+63[0-9]{10}$/).withMessage('Invalid Philippine phone number format'),
];

const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Register new user
router.post('/register', validateRegistration, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { email, password, name, role, company, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create user (password is hashed in User model hook)
    const user = await User.create({
      email,
      password,
      name,
      role,
      company,
      phone,
      isVerified: false
    });

    // Create default freemium subscription
    await Subscription.create({
      userId: user.id,
      tier: 'freemium',
      status: 'active',
      monthlyPrice: 0,
      currency: 'PHP'
    });

    // Initialize AI points (10 points for freemium)
    await AIPoints.create({
      userId: user.id,
      balance: 10,
      totalEarned: 10
    });

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      { expiresIn: '30d' }
    );

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: error.message || 'Unable to create user account',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Login user
router.post('/login', validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      { expiresIn: '30d' }
    );

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        tokens: {
          accessToken,
          refreshToken
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: 'Unable to authenticate user'
    });
  }
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret');
    
    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken
      }
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, just return success
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userResponse = req.user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch profile'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, company, phone } = req.body;

    // Validate Philippine phone number if provided
    if (phone && !/^\+63[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Philippine phone number format'
      });
    }

    // Update user profile
    const user = req.user;
    if (name) user.name = name;
    if (company) user.company = company;
    if (phone) user.phone = phone;
    
    await user.save();

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update profile'
    });
  }
});

module.exports = router; 