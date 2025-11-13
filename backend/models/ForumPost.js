const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ForumPost = sequelize.define('ForumPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'author_id'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('project-help', 'general', 'materials', 'tips', 'marketplace'),
    defaultValue: 'general'
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_pinned'
  },
  isSponsored: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_sponsored'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  replies: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'forum_posts'
});

module.exports = ForumPost;




