const express = require('express');
const router = express.Router();
const { Message, User } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get conversations for current user
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    // Get all unique conversation partners
    const sentMessages = await Message.findAll({
      where: { senderId: req.user.id },
      attributes: ['receiverId'],
      group: ['receiverId']
    });

    const receivedMessages = await Message.findAll({
      where: { receiverId: req.user.id },
      attributes: ['senderId'],
      group: ['senderId']
    });

    const conversationIds = new Set([
      ...sentMessages.map(m => m.receiverId),
      ...receivedMessages.map(m => m.senderId)
    ]);

    const conversations = await Promise.all(
      Array.from(conversationIds).map(async (userId) => {
      const lastMessage = await Message.findOne({
        where: {
          [Op.or]: [
            { senderId: req.user.id, receiverId: userId },
            { senderId: userId, receiverId: req.user.id }
          ]
        },
          order: [['createdAt', 'DESC']],
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'name', 'avatar']
          }]
        });

        const unreadCount = await Message.count({
          where: {
            senderId: userId,
            receiverId: req.user.id,
            isRead: false
          }
        });

        const otherUser = await User.findByPk(userId, {
          attributes: ['id', 'name', 'avatar', 'role']
        });

        return {
          userId: userId,
          user: otherUser,
          lastMessage,
          unreadCount
        };
      })
    );

    res.json({
      success: true,
      data: conversations.sort((a, b) => {
        if (!a.lastMessage || !b.lastMessage) return 0;
        return b.lastMessage.createdAt - a.lastMessage.createdAt;
      })
    });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch conversations'
    });
  }
});

// Get messages between current user and another user
router.get('/conversation/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id }
        ]
      },
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'avatar']
      }, {
        model: User,
        as: 'receiver',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'ASC']]
    });

    // Mark messages as read
    await Message.update(
      { isRead: true, readAt: new Date() },
      {
        where: {
          senderId: userId,
          receiverId: req.user.id,
          isRead: false
        }
      }
    );

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
});

// Send message
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { receiverId, projectId, content, type, attachments } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        error: 'Receiver ID and content are required'
      });
    }

    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      projectId,
      content,
      type: type || 'text',
      attachments: attachments || [],
      isRead: false
    });

    const messageWithUser = await Message.findByPk(message.id, {
      include: [{
        model: User,
        as: 'sender',
        attributes: ['id', 'name', 'avatar']
      }]
    });

    res.status(201).json({
      success: true,
      data: messageWithUser,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
});

// Mark message as read
router.put('/:id/read', authenticateToken, async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    if (message.receiverId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    message.isRead = true;
    message.readAt = new Date();
    await message.save();

    res.json({
      success: true,
      data: message,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark message as read'
    });
  }
});

module.exports = router;

