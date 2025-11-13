const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const InventoryItem = sequelize.define('InventoryItem', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      amount: 0,
      currency: 'PHP'
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_available'
  },
  geotags: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      latitude: null,
      longitude: null,
      address: null
    }
  }
}, {
  tableName: 'inventory_items'
});

module.exports = InventoryItem;

