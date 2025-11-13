const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Initialize database
const { sequelize, testConnection } = require('./config/database');
const models = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const userRoutes = require('./routes/users');
const aiRoutes = require('./routes/ai');
const paymentRoutes = require('./routes/payments');
const marketplaceRoutes = require('./routes/marketplace');
const figmaRoutes = require('./routes/figma');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration for Philippine market
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://design2build.pro', 'https://www.design2build.pro']
    : ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Regional middleware for Philippine market
app.use((req, res, next) => {
  // Set default currency and locale for Philippines
  req.region = {
    country: 'PH',
    currency: 'PHP',
    locale: 'en',
    timezone: 'Asia/Manila'
  };
  
  // Detect user's region from headers or IP
  const userCountry = req.headers['cf-ipcountry'] || req.headers['x-forwarded-for'];
  if (userCountry && userCountry !== 'PH') {
    // Handle international users
    req.region.country = userCountry;
    req.region.currency = getCurrencyForCountry(userCountry);
  }
  
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/figma', figmaRoutes);
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/moodboards', require('./routes/moodboards'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/receipts', require('./routes/receipts'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/ads', require('./routes/ads'));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    region: req.region,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
      details: err.details
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or missing authentication token'
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Helper function to get currency for country
function getCurrencyForCountry(countryCode) {
  const currencyMap = {
    'US': 'USD',
    'SG': 'SGD',
    'EU': 'EUR',
    'PH': 'PHP'
  };
  return currencyMap[countryCode] || 'USD';
}

// Initialize database and start server
async function startServer() {
  // Test database connection
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.log('⚠️  Starting server without database connection (will use mock data)');
  } else {
    // Sync database models in development
    if (process.env.NODE_ENV === 'development') {
      try {
        await sequelize.sync({ alter: false }); // Set to true if you want to auto-update schema
        console.log('✅ Database models ready');
      } catch (error) {
        console.error('⚠️  Database sync warning:', error.message);
      }
    }
  }
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Design2Build.Pro API server running on port ${PORT}`);
    console.log(`🌏 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🇵🇭 Philippine market ready`);
    console.log(`💳 Payment providers: PayMongo, Xendit`);
    console.log(`🔒 BIR & Data Privacy Act compliant`);
  });

  // Initialize Socket.IO for real-time features
  const { initializeSocket } = require('./socket');
  initializeSocket(server);
  console.log('✅ Socket.IO initialized for real-time messaging');
}

startServer();

module.exports = app; 