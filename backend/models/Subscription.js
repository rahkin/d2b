const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'user_id'
  },
  tier: {
    type: DataTypes.ENUM('freemium', 'pro', 'pro-plus', 'enterprise'),
    allowNull: false,
    defaultValue: 'freemium'
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'expired', 'trial'),
    allowNull: false,
    defaultValue: 'active'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'start_date'
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'end_date'
  },
  monthlyPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    field: 'monthly_price'
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'PHP'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'payment_method'
  },
  autoRenew: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'auto_renew'
  }
}, {
  tableName: 'subscriptions'
});

// Subscription tier features and limits
const SUBSCRIPTION_TIERS = {
  freemium: {
    name: 'Freemium',
    monthlyPrice: 0,
    features: {
      projects: 3,
      aiPoints: 10,
      storage: '1GB',
      collaboration: false,
      branding: false,
      crm: false,
      invoicing: false,
      apiAccess: false
    }
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 1157.40,
    features: {
      projects: -1, // unlimited
      aiPoints: 300,
      storage: '10GB',
      collaboration: true,
      branding: true,
      crm: false,
      invoicing: false,
      apiAccess: false
    }
  },
  'pro-plus': {
    name: 'Pro+',
    monthlyPrice: 2894.37,
    features: {
      projects: -1,
      aiPoints: 1300,
      storage: '50GB',
      collaboration: true,
      branding: true,
      crm: true,
      invoicing: true,
      apiAccess: false
    }
  },
  enterprise: {
    name: 'Enterprise',
    monthlyPrice: 0, // custom pricing
    features: {
      projects: -1,
      aiPoints: -1, // unlimited
      storage: 'unlimited',
      collaboration: true,
      branding: true,
      crm: true,
      invoicing: true,
      apiAccess: true
    }
  }
};

Subscription.getTierFeatures = (tier) => {
  return SUBSCRIPTION_TIERS[tier] || SUBSCRIPTION_TIERS.freemium;
};

Subscription.getAllTiers = () => {
  return SUBSCRIPTION_TIERS;
};

module.exports = Subscription;

