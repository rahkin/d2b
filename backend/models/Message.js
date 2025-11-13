const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  senderId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'sender_id'
  },
  receiverId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'receiver_id'
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'projects',
      key: 'id'
    },
    field: 'project_id'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('text', 'file', 'image', 'system'),
    defaultValue: 'text'
  },
  attachments: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_read'
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'read_at'
  }
}, {
  tableName: 'messages'
});

module.exports = Message;

