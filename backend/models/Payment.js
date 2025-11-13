const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    },
    field: 'order_id'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    allowNull: false,
    defaultValue: 'PHP'
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  method: {
    type: DataTypes.ENUM('card', 'bank-transfer', 'gcash', 'paymaya', 'paypal'),
    allowNull: false
  },
  provider: {
    type: DataTypes.ENUM('paymongo', 'xendit', 'stripe'),
    allowNull: false
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'transaction_id'
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'paid_at'
  }
}, {
  tableName: 'payments'
});

module.exports = Payment;




