const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ad = sequelize.define('Ad', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'vendor_id'
  },
  package: {
    type: DataTypes.ENUM('basic', 'standard', 'premium', 'platinum'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  placement: {
    type: DataTypes.ENUM('moodboard', 'ai-render', 'sketch-upload', 'project-profile', 'forum', 'search'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'paused', 'expired'),
    defaultValue: 'draft'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_date'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date'
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  monthlyPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'monthly_price'
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'PHP'
  },
  geotags: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      latitude: null,
      longitude: null,
      address: null,
      radius: null
    }
  },
  targetAudience: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      roles: [],
      locations: [],
      interests: []
    },
    field: 'target_audience'
  }
}, {
  tableName: 'ads'
});

module.exports = Ad;




