const express = require('express');
const router = express.Router();
const { ForumPost, ForumReply, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get all forum posts
router.get('/posts', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20, sortBy = 'createdAt', order = 'desc' } = req.query;

    const where = {};
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const posts = await ForumPost.findAll({
      where,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'avatar', 'role']
      }],
      order: [
        ['isPinned', 'DESC'],
        [sortBy, order.toUpperCase()]
      ],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });

    const total = await ForumPost.count({ where });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forum posts'
    });
  }
});

// Get single post with replies
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await ForumPost.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'avatar', 'role']
      }]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    // Get replies
    const replies = await ForumReply.findAll({
      where: { postId: post.id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'avatar', 'role']
      }],
      order: [['createdAt', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        post,
        replies
      }
    });
  } catch (error) {
    console.error('Error fetching forum post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch forum post'
    });
  }
});

// Create forum post
router.post('/posts', authenticateToken, async (req, res) => {
  try {
    const { title, content, category, geotags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    const post = await ForumPost.create({
      authorId: req.user.id,
      title,
      content,
      category: category || 'general',
      geotags
    });

    const postWithAuthor = await ForumPost.findByPk(post.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'avatar', 'role']
      }]
    });

    res.status(201).json({
      success: true,
      data: postWithAuthor,
      message: 'Post created successfully'
    });
  } catch (error) {
    console.error('Error creating forum post:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create forum post'
    });
  }
});

// Create reply
router.post('/posts/:id/replies', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const post = await ForumPost.findByPk(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const reply = await ForumReply.create({
      postId: id,
      authorId: req.user.id,
      content
    });

    // Update post reply count
    post.replies += 1;
    await post.save();

    const replyWithAuthor = await ForumReply.findByPk(reply.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'name', 'avatar', 'role']
      }]
    });

    res.status(201).json({
      success: true,
      data: replyWithAuthor,
      message: 'Reply created successfully'
    });
  } catch (error) {
    console.error('Error creating reply:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create reply'
    });
  }
});

module.exports = router;




