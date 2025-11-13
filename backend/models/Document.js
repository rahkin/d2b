const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Document = sequelize.define('Document', {
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
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'uploaded_by'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('contract', 'invoice', 'receipt', 'sketch', 'photo', 'other'),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'mime_type'
  }
}, {
  tableName: 'documents'
});

module.exports = Document;

