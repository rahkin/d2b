const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Moodboard = require('./Moodboard');
const InventoryItem = require('./InventoryItem');
const Order = require('./Order');
const Message = require('./Message');
const Subscription = require('./Subscription');
const AIPoints = require('./AIPoints');
const Document = require('./Document');
const Contract = require('./Contract');
const Receipt = require('./Receipt');
const Payment = require('./Payment');
const ForumPost = require('./ForumPost');
const ForumReply = require('./ForumReply');
const Ad = require('./Ad');

// Define associations
User.hasMany(Project, { foreignKey: 'client_id', as: 'clientProjects' });
User.hasMany(Project, { foreignKey: 'designer_id', as: 'designerProjects' });
Project.belongsTo(User, { foreignKey: 'client_id', as: 'client' });
Project.belongsTo(User, { foreignKey: 'designer_id', as: 'designer' });

Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Task.belongsTo(User, { foreignKey: 'assignee_id', as: 'assignee' });

User.hasMany(Moodboard, { foreignKey: 'user_id', as: 'moodboards' });
Moodboard.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(InventoryItem, { foreignKey: 'vendor_id' });
InventoryItem.belongsTo(User, { foreignKey: 'vendor_id', as: 'vendor' });

User.hasMany(Order, { foreignKey: 'client_id', as: 'clientOrders' });
User.hasMany(Order, { foreignKey: 'vendor_id', as: 'vendorOrders' });
Order.belongsTo(User, { foreignKey: 'client_id', as: 'client' });
Order.belongsTo(User, { foreignKey: 'vendor_id', as: 'vendor' });

User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

User.hasOne(Subscription, { foreignKey: 'user_id' });
Subscription.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(AIPoints, { foreignKey: 'user_id' });
AIPoints.belongsTo(User, { foreignKey: 'user_id' });

Project.hasMany(Document, { foreignKey: 'project_id', as: 'documents' });
Document.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Document.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

Project.hasMany(Contract, { foreignKey: 'project_id' });
Contract.belongsTo(Project, { foreignKey: 'project_id' });

Order.hasMany(Receipt, { foreignKey: 'order_id' });
Receipt.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Order.hasMany(Payment, { foreignKey: 'order_id', as: 'payments' });
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

User.hasMany(ForumPost, { foreignKey: 'author_id', as: 'forumPosts' });
ForumPost.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

ForumPost.hasMany(ForumReply, { foreignKey: 'post_id', as: 'forumReplies' });
ForumReply.belongsTo(ForumPost, { foreignKey: 'post_id', as: 'post' });
ForumReply.belongsTo(User, { foreignKey: 'author_id', as: 'author' });

User.hasMany(Ad, { foreignKey: 'vendor_id', as: 'ads' });
Ad.belongsTo(User, { foreignKey: 'vendor_id', as: 'vendor' });

module.exports = {
  sequelize,
  User,
  Project,
  Task,
  Moodboard,
  InventoryItem,
  Order,
  Message,
  Subscription,
  AIPoints,
  Document,
  Contract,
  Receipt,
  Payment,
  ForumPost,
  ForumReply,
  Ad
};

