const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Moodboard = sequelize.define('Moodboard', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  colors: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  style: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isTemplate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_template'
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_public'
  },
  collectionId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'collection_id'
  },
  aiGenerated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'ai_generated'
  },
  aiPrompt: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'ai_prompt'
  }
}, {
  tableName: 'moodboards'
});

module.exports = Moodboard;

