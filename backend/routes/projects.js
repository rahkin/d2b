const express = require('express');
const router = express.Router();

// Get all projects for user
router.get('/', async (req, res) => {
  try {
    // Mock projects data
    const projects = [
      {
        id: '1',
        title: 'Modern Condo Interior Design',
        description: 'Contemporary interior design for a 2-bedroom condo unit in Makati',
        clientId: 'client_1',
        designerId: 'designer_1',
        status: 'in-progress',
        budget: {
          amount: 85000,
          currency: 'PHP'
        },
        timeline: {
          startDate: '2024-01-15',
          endDate: '2024-03-15'
        },
        category: 'residential',
        tags: ['interior', 'modern', 'condo'],
        progress: 75,
        createdAt: '2024-01-10',
        updatedAt: '2024-02-01'
      },
      {
        id: '2',
        title: 'Office Renovation Project',
        description: 'Complete office renovation for a tech startup in BGC',
        clientId: 'client_2',
        designerId: 'designer_1',
        status: 'review',
        budget: {
          amount: 120000,
          currency: 'PHP'
        },
        timeline: {
          startDate: '2024-01-20',
          endDate: '2024-04-20'
        },
        category: 'commercial',
        tags: ['renovation', 'office', 'modern'],
        progress: 90,
        createdAt: '2024-01-15',
        updatedAt: '2024-02-05'
      }
    ];

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
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock project data
    const project = {
      id,
      title: 'Modern Condo Interior Design',
      description: 'Contemporary interior design for a 2-bedroom condo unit in Makati',
      clientId: 'client_1',
      designerId: 'designer_1',
      status: 'in-progress',
      budget: {
        amount: 85000,
        currency: 'PHP'
      },
      timeline: {
        startDate: '2024-01-15',
        endDate: '2024-03-15'
      },
      category: 'residential',
      tags: ['interior', 'modern', 'condo'],
      progress: 75,
      tasks: [
        {
          id: 'task_1',
          title: 'Initial Consultation',
          description: 'Meet with client to discuss requirements',
          status: 'completed',
          assigneeId: 'designer_1',
          dueDate: '2024-01-20',
          completedAt: '2024-01-18'
        },
        {
          id: 'task_2',
          title: 'Design Concept',
          description: 'Create initial design concept and moodboard',
          status: 'in-progress',
          assigneeId: 'designer_1',
          dueDate: '2024-02-01',
          progress: 80
        },
        {
          id: 'task_3',
          title: 'Client Approval',
          description: 'Present design to client for approval',
          status: 'todo',
          assigneeId: 'designer_1',
          dueDate: '2024-02-15'
        }
      ],
      files: [
        {
          id: 'file_1',
          name: 'floor-plan.pdf',
          type: 'pdf',
          size: '2.4MB',
          uploadedAt: '2024-01-15'
        },
        {
          id: 'file_2',
          name: 'moodboard.jpg',
          type: 'image',
          size: '1.8MB',
          uploadedAt: '2024-01-20'
        }
      ],
      createdAt: '2024-01-10',
      updatedAt: '2024-02-01'
    };

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

// Create new project
router.post('/', async (req, res) => {
  try {
    const { title, description, budget, timeline, category, tags } = req.body;

    // Mock project creation
    const newProject = {
      id: `project_${Date.now()}`,
      title,
      description,
      clientId: 'client_1', // Would come from auth
      designerId: null,
      status: 'draft',
      budget: {
        amount: budget.amount,
        currency: budget.currency || 'PHP'
      },
      timeline,
      category,
      tags,
      progress: 0,
      tasks: [],
      files: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
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
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Mock project update
    const updatedProject = {
      id,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });

  } catch (error) {
    console.error('Project update error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to update project'
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock project deletion
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Project deletion error:', error);
    res.status(500).json({
      success: false,
      error: 'Unable to delete project'
    });
  }
});

// Get project tasks
router.get('/:id/tasks', async (req, res) => {
  try {
    const { id } = req.params;

    // Mock tasks data
    const tasks = [
      {
        id: 'task_1',
        projectId: id,
        title: 'Initial Consultation',
        description: 'Meet with client to discuss requirements',
        status: 'completed',
        priority: 'high',
        assigneeId: 'designer_1',
        dueDate: '2024-01-20',
        completedAt: '2024-01-18',
        estimatedHours: 2,
        actualHours: 1.5
      },
      {
        id: 'task_2',
        projectId: id,
        title: 'Design Concept',
        description: 'Create initial design concept and moodboard',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 'designer_1',
        dueDate: '2024-02-01',
        estimatedHours: 8,
        actualHours: 6
      }
    ];

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
router.post('/:id/tasks', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assigneeId, dueDate, priority, estimatedHours } = req.body;

    const newTask = {
      id: `task_${Date.now()}`,
      projectId: id,
      title,
      description,
      status: 'todo',
      priority: priority || 'medium',
      assigneeId,
      dueDate,
      estimatedHours,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
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