const express = require('express');
const router = express.Router();
const { Contract, Project } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Get contracts for project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByPk(projectId);
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

    const contracts = await Contract.findAll({
      where: { projectId },
      order: [['version', 'DESC'], ['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: contracts
    });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contracts'
    });
  }
});

// Create contract
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { projectId, title, content } = req.body;

    if (!projectId || !title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Project ID, title, and content are required'
      });
    }

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    // Check if user can create contracts (designer or project manager)
    if (project.designerId !== req.user.id && 
        project.projectManagerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    // Get latest version
    const latestContract = await Contract.findOne({
      where: { projectId },
      order: [['version', 'DESC']]
    });

    const contract = await Contract.create({
      projectId,
      title,
      content,
      status: 'draft',
      version: latestContract ? latestContract.version + 1 : 1
    });

    res.status(201).json({
      success: true,
      data: contract,
      message: 'Contract created successfully'
    });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create contract'
    });
  }
});

// Update contract
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        error: 'Contract not found'
      });
    }

    const project = await Project.findByPk(contract.projectId);
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

    const { title, content, status } = req.body;

    if (title) contract.title = title;
    if (content) contract.content = content;
    if (status) contract.status = status;

    await contract.save();

    res.json({
      success: true,
      data: contract,
      message: 'Contract updated successfully'
    });
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contract'
    });
  }
});

// Sign contract
router.post('/:id/sign', authenticateToken, async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        error: 'Contract not found'
      });
    }

    const project = await Project.findByPk(contract.projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    // Check if user is part of the project
    if (project.clientId !== req.user.id && 
        project.designerId !== req.user.id && 
        project.projectManagerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    // Add user to signed by list if not already signed
    if (!contract.signedBy.includes(req.user.id)) {
      contract.signedBy = [...contract.signedBy, req.user.id];
      contract.signedAt = new Date();
      
      // If both client and designer have signed, mark as signed
      if (contract.signedBy.length >= 2) {
        contract.status = 'signed';
      }
      
      await contract.save();
    }

    res.json({
      success: true,
      data: contract,
      message: 'Contract signed successfully'
    });
  } catch (error) {
    console.error('Error signing contract:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sign contract'
    });
  }
});

module.exports = router;




