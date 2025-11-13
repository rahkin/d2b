const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ForumReply = sequelize.define('ForumReply', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'forum_posts',
      key: 'id'
    },
    field: 'post_id'
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isAnswer: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_answer'
  }
}, {
  tableName: 'forum_replies'
});

module.exports = ForumReply;




