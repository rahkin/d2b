const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { Document, Project } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { uploadFromBuffer } = require('../utils/cloudinary');

// Configure multer for file uploads (memory storage for Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|zip/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload document
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const { projectId, type, name } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        error: 'Project ID is required'
      });
    }

    // Verify project exists and user has access
    const project = await Project.findByPk(projectId);
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

    // Upload to Cloudinary if configured, otherwise use local storage
    let fileUrl;
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      try {
        const uploadResult = await uploadFromBuffer(req.file.buffer, {
          folder: `d2b/projects/${projectId}/documents`,
          resource_type: 'auto'
        });
        fileUrl = uploadResult.url;
      } catch (error) {
        console.error('Cloudinary upload failed, using local storage:', error);
        // Fallback to local storage
        const localPath = path.join(__dirname, '../../uploads', req.file.originalname);
        await fs.writeFile(localPath, req.file.buffer);
        fileUrl = `/uploads/${req.file.originalname}`;
      }
    } else {
      // Local storage fallback
      const localPath = path.join(__dirname, '../../uploads', req.file.originalname);
      await fs.writeFile(localPath, req.file.buffer);
      fileUrl = `/uploads/${req.file.originalname}`;
    }

    const document = await Document.create({
      projectId,
      uploadedBy: req.user.id,
      name: name || req.file.originalname,
      type: type || 'other',
      url: fileUrl,
      size: req.file.size,
      mimeType: req.file.mimetype
    });

    res.json({
      success: true,
      data: document,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload document'
    });
  }
});

// Get documents for project
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

    const documents = await Document.findAll({
      where: { projectId },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch documents'
    });
  }
});

// Delete document
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found'
      });
    }

    // Check if user uploaded it or is project owner
    const project = await Project.findByPk(document.projectId);
    if (document.uploadedBy !== req.user.id && 
        project?.clientId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    await document.destroy();

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete document'
    });
  }
});

module.exports = router;

