const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
    enum: [
      'reply',
      'mention',
      'upvote',
      'downvote',
      'solution_marked',
      'discussion_approved',
      'discussion_rejected',
      'moderator_action',
      'announcement',
      'course_update'
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  relatedDiscussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion'
  },
  relatedReply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  },
  relatedCourse: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  expiresAt: Date,
  readAt: Date,
  archivedAt: Date
}, {
  timestamps: true
});

// Indexes for better query performance
NotificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
NotificationSchema.index({ recipient: 1, type: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ expiresAt: 1 });

// Virtual for formatted creation date
NotificationSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to mark as read
NotificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Method to archive
NotificationSchema.methods.archive = function() {
  this.isArchived = true;
  this.archivedAt = new Date();
  return this.save();
};

// Method to unarchive
NotificationSchema.methods.unarchive = function() {
  this.isArchived = false;
  this.archivedAt = undefined;
  return this.save();
};

// Static method to create notification
NotificationSchema.statics.createNotification = function(data) {
  return this.create(data);
};

// Static method to get unread count for user
NotificationSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({
    recipient: userId,
    isRead: false,
    isArchived: false
  });
};

// Static method to mark multiple as read
NotificationSchema.statics.markMultipleAsRead = function(userId, notificationIds) {
  return this.updateMany(
    {
      _id: { $in: notificationIds },
      recipient: userId
    },
    {
      $set: {
        isRead: true,
        readAt: new Date()
      }
    }
  );
};

// Static method to clean expired notifications
NotificationSchema.statics.cleanExpired = function() {
  return this.deleteMany({
    expiresAt: { $lt: new Date() }
  });
};

module.exports = mongoose.model('Notification', NotificationSchema);

