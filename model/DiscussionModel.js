const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Academic', 'Technical', 'Social', 'Announcement'],
    default: 'General'
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    filename: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number
  }],
  links: [{
    title: String,
    url: String,
    description: String
  }],
  codeSnippets: [{
    language: String,
    code: String,
    description: String
  }],
  status: {
    type: String,
    enum: ['active', 'locked', 'archived', 'pending_approval'],
    default: 'active'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isSticky: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  replyCount: {
    type: Number,
    default: 0
  },
  lastReply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deletionReason: String
}, {
  timestamps: true
});

// Indexes for better query performance
DiscussionSchema.index({ courseId: 1, status: 1, createdAt: -1 });
DiscussionSchema.index({ author: 1, createdAt: -1 });
DiscussionSchema.index({ tags: 1 });
DiscussionSchema.index({ title: 'text', content: 'text' });

// Virtual for formatted creation date
DiscussionSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to increment view count
DiscussionSchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Method to update reply count
DiscussionSchema.methods.updateReplyCount = function() {
  return this.model('Reply').countDocuments({ discussionId: this._id, status: 'active' })
    .then(count => {
      this.replyCount = count;
      this.lastActivity = new Date();
      return this.save();
    });
};

// Method to soft delete
DiscussionSchema.methods.softDelete = function(userId, reason) {
  this.status = 'archived';
  this.deletedAt = new Date();
  this.deletedBy = userId;
  this.deletionReason = reason;
  return this.save();
};

module.exports = mongoose.model('Discussion', DiscussionSchema);

