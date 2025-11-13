const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assigneeId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'assignee_id'
  },
  status: {
    type: DataTypes.ENUM('todo', 'in-progress', 'review', 'completed'),
    defaultValue: 'todo'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'due_date'
  },
  estimatedHours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'estimated_hours'
  },
  actualHours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'actual_hours'
  }
}, {
  tableName: 'tasks'
});

module.exports = Task;

