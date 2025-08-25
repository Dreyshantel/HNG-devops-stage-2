const DiscussionModel = require("../model/DiscussionModel");
const ReplyModel = require("../model/ReplyModel");
const NotificationModel = require("../model/NotificationModel");
const controllerError = require("../utils/controllerError");

// Create new discussion
module.exports.createDiscussion = async (req, res, next) => {
  try {
    const { title, content, courseId, category, tags, links, codeSnippets } = req.body;
    const author = req.user._id;

    // Check if user has permission to post in this course
    if (req.user.role === "Student") {
      // Students can only post in courses they're enrolled in
      // This would need to be implemented based on your enrollment system
    }

    // Process tags - handle both string and array formats
    let processedTags = [];
    if (tags) {
      if (typeof tags === 'string') {
        processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      } else if (Array.isArray(tags)) {
        processedTags = tags.filter(tag => tag && tag.trim());
      }
    }

    // Process links - handle both string and array formats
    let processedLinks = [];
    if (links) {
      if (typeof links === 'string') {
        try {
          processedLinks = JSON.parse(links);
        } catch (e) {
          processedLinks = [];
        }
      } else if (Array.isArray(links)) {
        processedLinks = links;
      }
    }

    // Process code snippets - handle both string and array formats
    let processedCodeSnippets = [];
    if (codeSnippets) {
      if (typeof codeSnippets === 'string') {
        try {
          processedCodeSnippets = JSON.parse(codeSnippets);
        } catch (e) {
          processedCodeSnippets = [];
        }
      } else if (Array.isArray(codeSnippets)) {
        processedCodeSnippets = codeSnippets;
      }
    }

    // Process file attachments
    let processedAttachments = [];
    if (req.files && req.files.length > 0) {
      processedAttachments = req.files.map(file => ({
        filename: file.originalname,
        fileUrl: file.path || file.location, // Handle both local and cloud storage
        fileType: file.mimetype,
        fileSize: file.size
      }));
    }

    const discussion = new DiscussionModel({
      title,
      content,
      author,
      courseId,
      category,
      tags: processedTags,
      attachments: processedAttachments,
      links: processedLinks,
      codeSnippets: processedCodeSnippets,
      status: req.user.role === "Lecturer" || req.user.role === "Admin" ? "active" : "pending_approval"
    });

    const savedDiscussion = await discussion.save();

    // If discussion needs approval, notify moderators
    if (savedDiscussion.status === "pending_approval") {
      // Find course moderators/lecturers
      // This would need to be implemented based on your course structure
    }

    // Populate author information
    await savedDiscussion.populate('author', 'userName email role');

    res.status(201).json({
      success: true,
      discussion: savedDiscussion
    });
  } catch (error) {
    controllerError(error, res, "Error creating discussion");
  }
};

// Get all discussions for a course
module.exports.getCourseDiscussions = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { page = 1, limit = 10, category, status, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const query = { courseId, status: { $ne: "deleted" } };
    
    if (category) query.category = category;
    if (status) query.status = status;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const discussions = await DiscussionModel.find(query)
      .populate('author', 'userName email role')
      .populate('lastReply')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await DiscussionModel.countDocuments(query);

    res.status(200).json({
      success: true,
      discussions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    controllerError(error, res, "Error fetching discussions");
  }
};

// Get single discussion with replies
module.exports.getDiscussion = async (req, res, next) => {
  try {
    const { discussionId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const discussion = await DiscussionModel.findById(discussionId)
      .populate('author', 'userName email role')
      .populate('moderators', 'userName email role')
      .populate('approvedBy', 'userName email role');

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    // Increment view count
    await discussion.incrementViewCount();

    // Get replies
    const replies = await ReplyModel.find({ 
      discussionId, 
      status: "active" 
    })
      .populate('author', 'userName email role')
      .populate('editedBy', 'userName email role')
      .sort({ createdAt: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalReplies = await ReplyModel.countDocuments({ 
      discussionId, 
      status: "active" 
    });

    res.status(200).json({
      success: true,
      discussion,
      replies,
      totalPages: Math.ceil(totalReplies / limit),
      currentPage: page,
      totalReplies
    });
  } catch (error) {
    controllerError(error, res, "Error fetching discussion");
  }
};

// Update discussion
module.exports.updateDiscussion = async (req, res, next) => {
  try {
    const { discussionId } = req.params;
    const { title, content, category, tags, attachments, links, codeSnippets } = req.body;
    const userId = req.user._id;

    const discussion = await DiscussionModel.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    // Check permissions
    if (discussion.author.toString() !== userId.toString() && 
        req.user.role !== "Lecturer" && 
        req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this discussion"
      });
    }

    const updatedDiscussion = await DiscussionModel.findByIdAndUpdate(
      discussionId,
      {
        title,
        content,
        category,
        tags,
        attachments,
        links,
        codeSnippets,
        lastActivity: new Date()
      },
      { new: true, runValidators: true }
    ).populate('author', 'userName email role');

    res.status(200).json({
      success: true,
      discussion: updatedDiscussion
    });
  } catch (error) {
    controllerError(error, res, "Error updating discussion");
  }
};

// Delete discussion
module.exports.deleteDiscussion = async (req, res, next) => {
  try {
    const { discussionId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;

    const discussion = await DiscussionModel.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    // Check permissions
    if (discussion.author.toString() !== userId.toString() && 
        req.user.role !== "Lecturer" && 
        req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to delete this discussion"
      });
    }

    await discussion.softDelete(userId, reason);

    res.status(200).json({
      success: true,
      message: "Discussion deleted successfully"
    });
  } catch (error) {
    controllerError(error, res, "Error deleting discussion");
  }
};

// Moderate discussion (approve/reject)
module.exports.moderateDiscussion = async (req, res, next) => {
  try {
    const { discussionId } = req.params;
    const { action, reason } = req.body;
    const moderatorId = req.user._id;

    // Check if user is moderator/lecturer/admin
    if (req.user.role !== "Lecturer" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to moderate discussions"
      });
    }

    const discussion = await DiscussionModel.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    if (action === "approve") {
      discussion.status = "active";
      discussion.approvedBy = moderatorId;
      discussion.approvedAt = new Date();
    } else if (action === "reject") {
      discussion.status = "archived";
      discussion.deletedBy = moderatorId;
      discussion.deletedAt = new Date();
      discussion.deletionReason = reason;
    }

    await discussion.save();

    // Notify author
    await NotificationModel.createNotification({
      recipient: discussion.author,
      sender: moderatorId,
      type: action === "approve" ? "discussion_approved" : "discussion_rejected",
      title: `Discussion ${action === "approve" ? "Approved" : "Rejected"}`,
      message: `Your discussion "${discussion.title}" has been ${action === "approve" ? "approved" : "rejected"}. ${reason ? `Reason: ${reason}` : ""}`,
      relatedDiscussion: discussionId,
      relatedCourse: discussion.courseId
    });

    res.status(200).json({
      success: true,
      message: `Discussion ${action}ed successfully`,
      discussion
    });
  } catch (error) {
    controllerError(error, res, "Error moderating discussion");
  }
};

// Pin/Unpin discussion
module.exports.togglePinDiscussion = async (req, res, next) => {
  try {
    const { discussionId } = req.params;
    const { action } = req.body;

    // Check if user is lecturer/admin
    if (req.user.role !== "Lecturer" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to pin discussions"
      });
    }

    const discussion = await DiscussionModel.findById(discussionId);

    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    if (action === "pin") {
      discussion.isPinned = true;
    } else if (action === "unpin") {
      discussion.isPinned = false;
    }

    await discussion.save();

    res.status(200).json({
      success: true,
      message: `Discussion ${action}ed successfully`,
      discussion
    });
  } catch (error) {
    controllerError(error, res, "Error toggling pin status");
  }
};

// Search discussions
module.exports.searchDiscussions = async (req, res, next) => {
  try {
    const { q, courseId, category, author, tags } = req.query;
    const { page = 1, limit = 10 } = req.query;

    const query = { status: { $ne: "deleted" } };

    if (courseId) query.courseId = courseId;
    if (category) query.category = category;
    if (author) query.author = author;
    if (tags) query.tags = { $in: tags.split(',') };

    if (q) {
      query.$text = { $search: q };
    }

    const discussions = await DiscussionModel.find(query)
      .populate('author', 'userName email role')
      .sort({ isPinned: -1, isSticky: -1, lastActivity: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await DiscussionModel.countDocuments(query);

    res.status(200).json({
      success: true,
      discussions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    controllerError(error, res, "Error searching discussions");
  }
};

// Get pending items for moderation
module.exports.getPendingItems = async (req, res, next) => {
  try {
    const { type } = req.query;
    
    let query = { status: "pending_approval" };
    if (type && type !== 'all') {
      // For now, we'll return discussions only since replies are in a separate collection
      // In a real implementation, you might want to join both collections
    }

    const pendingDiscussions = await DiscussionModel.find(query)
      .populate('author', 'userName email role')
      .sort({ createdAt: 1 })
      .limit(50);

    // Get pending replies
    const pendingReplies = await ReplyModel.find({ status: "pending_approval" })
      .populate('author', 'userName email role')
      .populate('discussionId', 'title')
      .sort({ createdAt: 1 })
      .limit(50);

    // Combine and format items
    const items = [
      ...pendingDiscussions.map(discussion => ({
        ...discussion.toObject(),
        type: 'discussion'
      })),
      ...pendingReplies.map(reply => ({
        ...reply.toObject(),
        type: 'reply',
        title: reply.discussionId?.title || 'Reply to discussion'
      }))
    ];

    // Sort by creation date
    items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    res.status(200).json({
      success: true,
      items,
      total: items.length
    });
  } catch (error) {
    controllerError(error, res, "Error fetching pending items");
  }
};
