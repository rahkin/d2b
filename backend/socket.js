const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { User, Message } = require('./models');

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? ['https://design2build.pro', 'https://www.design2build.pro']
        : ['http://localhost:3000'],
      credentials: true
    }
  });

  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user.id;
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);

    // Join user's personal room
    socket.join(`user:${socket.userId}`);

    // Handle typing indicators
    socket.on('typing', ({ conversationId, userId }) => {
      socket.to(`user:${userId}`).emit('typing', {
        conversationId,
        userId: socket.userId,
        userName: socket.user.name
      });
    });

    socket.on('stop-typing', ({ conversationId, userId }) => {
      socket.to(`user:${userId}`).emit('stop-typing', {
        conversationId,
        userId: socket.userId
      });
    });

    // Handle new message
    socket.on('send-message', async (data) => {
      try {
        const { receiverId, content, projectId, type, attachments } = data;

        // Create message in database
        const message = await Message.create({
          senderId: socket.userId,
          receiverId,
          projectId,
          content,
          type: type || 'text',
          attachments: attachments || [],
          isRead: false
        });

        // Load message with sender info
        const messageWithSender = await Message.findByPk(message.id, {
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'name', 'avatar']
          }]
        });

        // Emit to receiver
        io.to(`user:${receiverId}`).emit('new-message', messageWithSender);

        // Emit confirmation to sender
        socket.emit('message-sent', messageWithSender);
      } catch (error) {
        console.error('Error sending message via socket:', error);
        socket.emit('message-error', { error: 'Failed to send message' });
      }
    });

    // Handle message read
    socket.on('mark-read', async (messageId) => {
      try {
        const message = await Message.findByPk(messageId);
        
        if (message && message.receiverId === socket.userId) {
          message.isRead = true;
          message.readAt = new Date();
          await message.save();

          // Notify sender
          io.to(`user:${message.senderId}`).emit('message-read', {
            messageId: message.id,
            readAt: message.readAt
          });
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
}

module.exports = { initializeSocket, getIO };




