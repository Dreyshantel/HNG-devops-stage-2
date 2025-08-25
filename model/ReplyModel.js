const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
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
  discussionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussion',
    required: true
  },
  parentReply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
    default: null
  },
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
    enum: ['active', 'hidden', 'deleted'],
    default: 'active'
  },
  isSolution: {
    type: Boolean,
    default: false
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  editedAt: Date,
  editedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  editHistory: [{
    content: String,
    editedAt: Date,
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
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
ReplySchema.index({ discussionId: 1, createdAt: 1 });
ReplySchema.index({ author: 1, createdAt: -1 });
ReplySchema.index({ parentReply: 1 });
ReplySchema.index({ status: 1 });

// Virtual for vote count
ReplySchema.virtual('voteCount').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Virtual for formatted creation date
ReplySchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Method to add vote
ReplySchema.methods.addVote = function(userId, voteType) {
  if (voteType === 'upvote') {
    // Remove from downvotes if exists
    this.downvotes = this.downvotes.filter(id => !id.equals(userId));
    // Add to upvotes if not already there
    if (!this.upvotes.some(id => id.equals(userId))) {
      this.upvotes.push(userId);
    }
  } else if (voteType === 'downvote') {
    // Remove from upvotes if exists
    this.upvotes = this.upvotes.filter(id => !id.equals(userId));
    // Add to downvotes if not already there
    if (!this.downvotes.some(id => id.equals(userId))) {
      this.downvotes.push(userId);
    }
  }
  return this.save();
};

// Method to remove vote
ReplySchema.methods.removeVote = function(userId) {
  this.upvotes = this.upvotes.filter(id => !id.equals(userId));
  this.downvotes = this.downvotes.filter(id => !id.equals(userId));
  return this.save();
};

// Method to mark as solution
ReplySchema.methods.markAsSolution = function() {
  this.isSolution = true;
  return this.save();
};

// Method to edit reply
ReplySchema.methods.editReply = function(newContent, userId) {
  // Save current content to edit history
  this.editHistory.push({
    content: this.content,
    editedAt: this.editedAt || this.createdAt,
    editedBy: this.editedBy || this.author
  });
  
  this.content = newContent;
  this.editedAt = new Date();
  this.editedBy = userId;
  return this.save();
};

// Method to soft delete
ReplySchema.methods.softDelete = function(userId, reason) {
  this.status = 'deleted';
  this.deletedAt = new Date();
  this.deletedBy = userId;
  this.deletionReason = reason;
  return this.save();
};

module.exports = mongoose.model('Reply', ReplySchema);

