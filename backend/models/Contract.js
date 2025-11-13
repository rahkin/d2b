const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contract = sequelize.define('Contract', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    },
    field: 'project_id'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'pending', 'approved', 'rejected', 'signed'),
    defaultValue: 'draft'
  },
  signedBy: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
    field: 'signed_by'
  },
  signedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'signed_at'
  },
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'contracts'
});

module.exports = Contract;

