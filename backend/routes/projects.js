const express = require('express');
const router = express.Router();
const { Project, Task, User, Document, Contract } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get all projects for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Get projects where user is client, designer, or project manager
    const projects = await Project.findAll({
      where: {
        [Op.or]: [
          { clientId: req.user.id },
          { designerId: req.user.id },
          { projectManagerId: req.user.id }
        ]
      },
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'avatar']
        },
        {
          model: User,
          as: 'designer',
          attributes: ['id', 'name', 'avatar']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch projects'
    });
  }
});

// Get single project
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'name', 'avatar', 'email', 'phone']
        },
        {
          model: User,
          as: 'designer',
          attributes: ['id', 'name', 'avatar', 'email', 'phone']
        },
        {
          model: Task,
          as: 'tasks'
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    // Check access
    if (project.clientId !== req.user.id && 
        project.designerId !== req.user.id && 
        project.projectManagerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch project'
    });
  }
});

// Create project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, budget, timeline, category, tags } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const project = await Project.create({
      title,
      description,
      clientId: req.user.id,
      status: 'draft',
      budget: budget || {
        amount: 0,
        currency: 'PHP',
        spent: 0,
        allocated: {}
      },
      timeline: timeline || {
        startDate: null,
        endDate: null,
        milestones: []
      },
      category,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      data: project,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Project creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to create project'
    });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    // Check access
    if (project.clientId !== req.user.id && 
        project.designerId !== req.user.id && 
        project.projectManagerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const { title, description, status, budget, timeline, category, tags } = req.body;

    if (title) project.title = title;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;
    if (budget) project.budget = budget;
    if (timeline) project.timeline = timeline;
    if (category) project.category = category;
    if (tags) project.tags = tags;

    await project.save();

    res.json({
      success: true,
      data: project,
      message: 'Project updated successfully'
    });
  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update project'
    });
  }
});

// Get project tasks
router.get('/:id/tasks', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    // Check access
    if (project.clientId !== req.user.id && 
        project.designerId !== req.user.id && 
        project.projectManagerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const tasks = await Task.findAll({
      where: { projectId: id },
      include: [{
        model: User,
        as: 'assignee',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Tasks fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to fetch tasks'
    });
  }
});

// Create task
router.post('/:id/tasks', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assigneeId, dueDate, priority, estimatedHours } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    // Check access
    if (project.clientId !== req.user.id && 
        project.designerId !== req.user.id && 
        project.projectManagerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const task = await Task.create({
      projectId: id,
      title,
      description,
      assigneeId,
      dueDate,
      priority: priority || 'medium',
      estimatedHours,
      status: 'todo'
    });

    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to create task'
    });
  }
});

module.exports = router;
