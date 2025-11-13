const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'client_id'
  },
  designerId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'designer_id'
  },
  projectManagerId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    field: 'project_manager_id'
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'in-progress', 'review', 'completed', 'cancelled'),
    defaultValue: 'draft'
  },
  category: {
    type: DataTypes.ENUM('residential', 'commercial', 'interior', 'landscape', 'renovation', 'new-construction'),
    allowNull: true
  },
  budget: {
    type: DataTypes.JSONB,
    defaultValue: {
      amount: 0,
      currency: 'PHP',
      spent: 0,
      allocated: {}
    }
  },
  timeline: {
    type: DataTypes.JSONB,
    defaultValue: {
      startDate: null,
      endDate: null,
      milestones: []
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  ganttData: {
    type: DataTypes.JSONB,
    allowNull: true,
    field: 'gantt_data'
  }
}, {
  tableName: 'projects'
});

module.exports = Project;

