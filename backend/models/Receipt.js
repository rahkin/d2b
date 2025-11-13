const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Receipt = sequelize.define('Receipt', {
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
  receiptNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'receipt_number'
  },
  tin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  vat: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
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
  isBIRCompliant: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_bir_compliant'
  },
  pdfUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'pdf_url'
  }
}, {
  tableName: 'receipts'
});

module.exports = Receipt;

