const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'client_id'
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
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_amount'
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'PHP'
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'refunded'),
    defaultValue: 'pending',
    field: 'payment_status'
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'payment_method'
  },
  shippingAddress: {
    type: DataTypes.JSONB,
    allowNull: true,
    field: 'shipping_address'
  },
  isPO: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_po'
  }
}, {
  tableName: 'orders'
});

module.exports = Order;

