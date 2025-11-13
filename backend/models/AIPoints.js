const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AIPoints = sequelize.define('AIPoints', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'user_id'
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_earned'
  },
  totalUsed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_used'
  },
  lastRefillDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_refill_date'
  }
}, {
  tableName: 'ai_points'
});

module.exports = AIPoints;

