const ReplyModel = require("../model/ReplyModel");
const DiscussionModel = require("../model/DiscussionModel");
const NotificationModel = require("../model/NotificationModel");
const controllerError = require("../utils/controllerError");

// Create new reply
module.exports.createReply = async (req, res, next) => {
  try {
    const { content, discussionId, parentReply, links, codeSnippets } = req.body;
    const author = req.user._id;

    // Validate discussion exists
    const discussion = await DiscussionModel.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    // Check if discussion is active
    if (discussion.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Cannot reply to inactive discussion"
      });
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

    const reply = new ReplyModel({
      content,
      author,
      discussionId,
      parentReply,
      attachments: processedAttachments,
      links: processedLinks,
      codeSnippets: processedCodeSnippets,
      status: req.user.role === "Lecturer" || req.user.role === "Admin" ? "active" : "pending_approval"
    });

    const savedReply = await reply.save();

    // Update discussion reply count
    await DiscussionModel.findByIdAndUpdate(
      discussionId,
      { $inc: { replyCount: 1 } }
    );

    // Create notification for discussion author
    if (discussion.author.toString() !== author.toString()) {
      await NotificationModel.createNotification({
        recipient: discussion.author,
        sender: author,
        type: "reply",
        title: "New Reply",
        message: `Someone replied to your discussion: ${discussion.title}`,
        relatedDiscussion: discussionId,
        relatedReply: savedReply._id
      });
    }

    // Create notification for parent reply author if this is a nested reply
    if (parentReply) {
      const parentReplyDoc = await ReplyModel.findById(parentReply);
      if (parentReplyDoc && parentReplyDoc.author.toString() !== author.toString()) {
        await NotificationModel.createNotification({
          recipient: parentReplyDoc.author,
          sender: author,
          type: "reply",
          title: "New Reply",
          message: `Someone replied to your comment in: ${discussion.title}`,
          relatedDiscussion: discussionId,
          relatedReply: savedReply._id
        });
      }
    }

    // Populate author information
    await savedReply.populate('author', 'userName email role');

    res.status(201).json({
      success: true,
      reply: savedReply
    });
  } catch (error) {
    controllerError(error, res, "Error creating reply");
  }
};

// Get replies for a discussion
module.exports.getDiscussionReplies = async (req, res, next) => {
  try {
    const { discussionId } = req.params;
    const { page = 1, limit = 20, sortBy = "createdAt", sortOrder = "asc" } = req.query;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const replies = await ReplyModel.find({ 
      discussionId, 
      status: "active" 
    })
      .populate('author', 'userName email role')
      .populate('editedBy', 'userName email role')
      .populate('parentReply')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await ReplyModel.countDocuments({ 
      discussionId, 
      status: "active" 
    });

    res.status(200).json({
      success: true,
      replies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    controllerError(error, res, "Error fetching replies");
  }
};

// Update reply
module.exports.updateReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { content, attachments, links, codeSnippets } = req.body;
    const userId = req.user._id;

    const reply = await ReplyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    // Check permissions
    if (reply.author.toString() !== userId.toString() && 
        req.user.role !== "Lecturer" && 
        req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to edit this reply"
      });
    }

    const updatedReply = await reply.editReply(content, userId);

    // Update attachments, links, and code snippets
    updatedReply.attachments = attachments || updatedReply.attachments;
    updatedReply.links = links || updatedReply.links;
    updatedReply.codeSnippets = codeSnippets || updatedReply.codeSnippets;

    await updatedReply.save();

    // Populate author information
    await updatedReply.populate('author', 'userName email role');
    await updatedReply.populate('editedBy', 'userName email role');

    res.status(200).json({
      success: true,
      reply: updatedReply
    });
  } catch (error) {
    controllerError(error, res, "Error updating reply");
  }
};

// Delete reply
module.exports.deleteReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;

    const reply = await ReplyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    // Check permissions
    if (reply.author.toString() !== userId.toString() && 
        req.user.role !== "Lecturer" && 
        req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to delete this reply"
      });
    }

    await reply.softDelete(userId, reason);

    // Update discussion reply count
    const discussion = await DiscussionModel.findById(reply.discussionId);
    if (discussion) {
      await discussion.updateReplyCount();
    }

    res.status(200).json({
      success: true,
      message: "Reply deleted successfully"
    });
  } catch (error) {
    controllerError(error, res, "Error deleting reply");
  }
};

// Vote on reply
module.exports.voteReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { voteType } = req.body;
    const userId = req.user._id;

    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vote type"
      });
    }

    const reply = await ReplyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    if (reply.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Cannot vote on inactive reply"
      });
    }

    await reply.addVote(userId, voteType);

    // Notify reply author (if different from voter)
    if (reply.author.toString() !== userId.toString()) {
      await NotificationModel.createNotification({
        recipient: reply.author,
        sender: userId,
        type: voteType,
        title: `Reply ${voteType === 'upvote' ? 'Upvoted' : 'Downvoted'}`,
        message: `${req.user.userName} ${voteType}ed your reply`,
        relatedReply: replyId,
        relatedDiscussion: reply.discussionId
      });
    }

    res.status(200).json({
      success: true,
      message: `Reply ${voteType}d successfully`,
      reply
    });
  } catch (error) {
    controllerError(error, res, "Error voting on reply");
  }
};

// Remove vote from reply
module.exports.removeVote = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const userId = req.user._id;

    const reply = await ReplyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    await reply.removeVote(userId);

    res.status(200).json({
      success: true,
      message: "Vote removed successfully",
      reply
    });
  } catch (error) {
    controllerError(error, res, "Error removing vote");
  }
};

// Mark reply as solution
module.exports.markAsSolution = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const userId = req.user._id;

    const reply = await ReplyModel.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    // Check if user is discussion author or lecturer/admin
    const discussion = await DiscussionModel.findById(reply.discussionId);
    if (!discussion) {
      return res.status(404).json({
        success: false,
        message: "Discussion not found"
      });
    }

    if (discussion.author.toString() !== userId.toString() && 
        req.user.role !== "Lecturer" && 
        req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to mark this as solution"
      });
    }

    await reply.markAsSolution();

    // Notify reply author
    await NotificationModel.createNotification({
      recipient: reply.author,
      sender: userId,
      type: 'solution_marked',
      title: 'Reply Marked as Solution',
      message: `Your reply in "${discussion.title}" has been marked as the solution!`,
      relatedReply: replyId,
      relatedDiscussion: reply.discussionId,
      relatedCourse: discussion.courseId
    });

    res.status(200).json({
      success: true,
      message: "Reply marked as solution successfully",
      reply
    });
  } catch (error) {
    controllerError(error, res, "Error marking reply as solution");
  }
};

// Get reply by ID
module.exports.getReply = async (req, res, next) => {
  try {
    const { replyId } = req.params;

    const reply = await ReplyModel.findById(replyId)
      .populate('author', 'userName email role')
      .populate('editedBy', 'userName email role')
      .populate('parentReply')
      .populate('discussionId');

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found"
      });
    }

    res.status(200).json({
      success: true,
      reply
    });
  } catch (error) {
    controllerError(error, res, "Error fetching reply");
  }
};
