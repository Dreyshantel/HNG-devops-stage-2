const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/keys');
const NotificationModel = require('../model/NotificationModel');
const DiscussionModel = require('../model/DiscussionModel');
const ReplyModel = require('../model/ReplyModel');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map(); // Map to store client connections
    this.rooms = new Map(); // Map to store room subscriptions
    
    this.init();
  }

  init() {
    this.wss.on('connection', (ws, req) => {
      this.handleConnection(ws, req);
    });

    // Clean up disconnected clients periodically
    setInterval(() => {
      this.cleanupDisconnectedClients();
    }, 30000); // Every 30 seconds
  }

  handleConnection(ws, req) {
    console.log('New WebSocket connection attempt');

    // Authenticate the connection
    this.authenticateConnection(ws, req)
      .then(user => {
        if (user) {
          this.setupClient(ws, user);
        } else {
          ws.close(1008, 'Authentication failed');
        }
      })
      .catch(err => {
        console.error('Authentication error:', err);
        ws.close(1008, 'Authentication error');
      });
  }

  async authenticateConnection(ws, req) {
    try {
      // Extract token from query string or headers
      const token = req.url.split('token=')[1] || req.headers['authorization']?.split(' ')[1];
      
      if (!token) {
        return null;
      }

      // Verify JWT token
      const decoded = jwt.verify(token, SECRET_KEY);
      
      // Get user from database to ensure they still exist
      const UserModel = require('../model/UserModel');
      const user = await UserModel.findById(decoded._id).select('_id userName email role');
      
      return user;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  setupClient(ws, user) {
    console.log(`User ${user.userName} (${user._id}) connected`);

    // Store client connection
    this.clients.set(user._id.toString(), {
      ws,
      user,
      connectedAt: new Date(),
      lastActivity: new Date()
    });

    // Send welcome message
    this.sendToClient(user._id, {
      type: 'connection_established',
      message: 'WebSocket connection established',
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role
      }
    });

    // Send unread notifications count
    this.sendUnreadNotificationsCount(user._id);

    // Handle incoming messages
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        this.handleMessage(user._id, message);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      this.handleDisconnect(user._id);
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error(`WebSocket error for user ${user.userName}:`, error);
      this.handleDisconnect(user._id);
    });

    // Keep track of activity
    ws.on('pong', () => {
      const client = this.clients.get(user._id.toString());
      if (client) {
        client.lastActivity = new Date();
      }
    });
  }

  handleMessage(userId, message) {
    const client = this.clients.get(userId.toString());
    if (!client) return;

    client.lastActivity = new Date();

    switch (message.type) {
      case 'join_room':
        this.joinRoom(userId, message.roomId);
        break;
      
      case 'leave_room':
        this.leaveRoom(userId, message.roomId);
        break;
      
      case 'subscribe_discussion':
        this.subscribeToDiscussion(userId, message.discussionId);
        break;
      
      case 'unsubscribe_discussion':
        this.unsubscribeFromDiscussion(userId, message.discussionId);
        break;
      
      case 'ping':
        this.sendToClient(userId, { type: 'pong', timestamp: Date.now() });
        break;
      
      default:
        console.log(`Unknown message type: ${message.type}`);
    }
  }

  joinRoom(userId, roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    
    this.rooms.get(roomId).add(userId.toString());
    console.log(`User ${userId} joined room ${roomId}`);
  }

  leaveRoom(userId, roomId) {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId).delete(userId.toString());
      
      // Clean up empty rooms
      if (this.rooms.get(roomId).size === 0) {
        this.rooms.delete(roomId);
      }
    }
    console.log(`User ${userId} left room ${roomId}`);
  }

  subscribeToDiscussion(userId, discussionId) {
    const roomId = `discussion_${discussionId}`;
    this.joinRoom(userId, roomId);
  }

  unsubscribeFromDiscussion(userId, discussionId) {
    const roomId = `discussion_${discussionId}`;
    this.leaveRoom(userId, roomId);
  }

  handleDisconnect(userId) {
    const client = this.clients.get(userId.toString());
    if (client) {
      console.log(`User ${client.user.userName} disconnected`);
      
      // Remove from all rooms
      this.rooms.forEach((users, roomId) => {
        users.delete(userId.toString());
        if (users.size === 0) {
          this.rooms.delete(roomId);
        }
      });
      
      this.clients.delete(userId.toString());
    }
  }

  // Send message to specific client
  sendToClient(userId, data) {
    const client = this.clients.get(userId.toString());
    if (client && client.ws.readyState === WebSocket.OPEN) {
      try {
        client.ws.send(JSON.stringify(data));
      } catch (error) {
        console.error(`Error sending message to user ${userId}:`, error);
      }
    }
  }

  // Send message to all clients in a room
  sendToRoom(roomId, data) {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId).forEach(userId => {
        this.sendToClient(userId, data);
      });
    }
  }

  // Send message to all connected clients
  broadcast(data) {
    this.clients.forEach((client, userId) => {
      this.sendToClient(userId, data);
    });
  }

  // Send notification to specific user
  async sendNotification(userId, notificationData) {
    try {
      // Save notification to database
      const notification = await NotificationModel.createNotification({
        ...notificationData,
        recipient: userId
      });

      // Send real-time notification
      this.sendToClient(userId, {
        type: 'notification',
        notification
      });

      return notification;
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Send unread notifications count
  async sendUnreadNotificationsCount(userId) {
    try {
      const count = await NotificationModel.getUnreadCount(userId);
      this.sendToClient(userId, {
        type: 'unread_notifications_count',
        count
      });
    } catch (error) {
      console.error('Error sending unread count:', error);
    }
  }

  // Notify discussion subscribers about new reply
  async notifyDiscussionUpdate(discussionId, updateType, data) {
    const roomId = `discussion_${discussionId}`;
    
    if (this.rooms.has(roomId)) {
      const message = {
        type: 'discussion_update',
        discussionId,
        updateType,
        data,
        timestamp: new Date()
      };

      this.sendToRoom(roomId, message);
    }
  }

  // Notify about new discussion
  async notifyNewDiscussion(discussion) {
    // Notify all users in the course
    const roomId = `course_${discussion.courseId}`;
    
    if (this.rooms.has(roomId)) {
      const message = {
        type: 'new_discussion',
        discussion,
        timestamp: new Date()
      };

      this.sendToRoom(roomId, message);
    }
  }

  // Clean up disconnected clients
  cleanupDisconnectedClients() {
    const now = new Date();
    const timeout = 5 * 60 * 1000; // 5 minutes

    this.clients.forEach((client, userId) => {
      if (now - client.lastActivity > timeout) {
        console.log(`Cleaning up inactive client: ${userId}`);
        client.ws.close(1000, 'Inactive timeout');
        this.handleDisconnect(userId);
      }
    });
  }

  // Get server statistics
  getStats() {
    return {
      totalClients: this.clients.size,
      totalRooms: this.rooms.size,
      activeConnections: Array.from(this.clients.values()).filter(client => 
        client.ws.readyState === WebSocket.OPEN
      ).length
    };
  }
}

module.exports = WebSocketServer;

