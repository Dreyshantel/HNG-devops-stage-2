const DiscussionModel = require("../model/DiscussionModel");
const ReplyModel = require("../model/ReplyModel");
const UserModel = require("../model/UserModel");
const NotificationModel = require("../model/NotificationModel");
const controllerError = require("../utils/controllerError");

// Get overall forum statistics
module.exports.getForumStats = async (req, res, next) => {
  try {
    const [
      totalDiscussions,
      totalReplies,
      totalUsers,
      activeDiscussions,
      pendingApprovals,
      totalViews
    ] = await Promise.all([
      DiscussionModel.countDocuments({ status: { $ne: "deleted" } }),
      ReplyModel.countDocuments({ status: "active" }),
      UserModel.countDocuments(),
      DiscussionModel.countDocuments({ status: "active" }),
      DiscussionModel.countDocuments({ status: "pending_approval" }),
      DiscussionModel.aggregate([
        { $group: { _id: null, totalViews: { $sum: "$viewCount" } } }
      ]).then(result => result[0]?.totalViews || 0)
    ]);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      recentDiscussions,
      recentReplies,
      newUsers
    ] = await Promise.all([
      DiscussionModel.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
        status: { $ne: "deleted" }
      }),
      ReplyModel.countDocuments({
        createdAt: { $gte: sevenDaysAgo },
        status: "active"
      }),
      UserModel.countDocuments({
        createdAt: { $gte: sevenDaysAgo }
      })
    ]);

    // Get top categories
    const topCategories = await DiscussionModel.aggregate([
      { $match: { status: { $ne: "deleted" } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get top contributors
    const topContributors = await DiscussionModel.aggregate([
      { $match: { status: { $ne: "deleted" } } },
      { $group: { _id: "$author", discussionCount: { $sum: 1 } } },
      { $sort: { discussionCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          userName: "$userInfo.userName",
          email: "$userInfo.email",
          role: "$userInfo.role",
          discussionCount: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalDiscussions,
        totalReplies,
        totalUsers,
        activeDiscussions,
        pendingApprovals,
        totalViews,
        recentDiscussions,
        recentReplies,
        newUsers,
        topCategories,
        topContributors
      }
    });
  } catch (error) {
    controllerError(error, res, "Error fetching forum statistics");
  }
};

// Get course-specific statistics
module.exports.getCourseStats = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { period = "30" } = req.query; // days

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    const [
      totalDiscussions,
      totalReplies,
      totalViews,
      recentDiscussions,
      recentReplies,
      categoryBreakdown,
      activityTimeline
    ] = await Promise.all([
      DiscussionModel.countDocuments({ courseId, status: { $ne: "deleted" } }),
      ReplyModel.countDocuments({ 
        discussionId: { $in: await DiscussionModel.find({ courseId }).distinct('_id') },
        status: "active"
      }),
      DiscussionModel.aggregate([
        { $match: { courseId, status: { $ne: "deleted" } } },
        { $group: { _id: null, totalViews: { $sum: "$viewCount" } } }
      ]).then(result => result[0]?.totalViews || 0),
      DiscussionModel.countDocuments({
        courseId,
        createdAt: { $gte: daysAgo },
        status: { $ne: "deleted" }
      }),
      ReplyModel.countDocuments({
        discussionId: { $in: await DiscussionModel.find({ courseId }).distinct('_id') },
        createdAt: { $gte: daysAgo },
        status: "active"
      }),
      DiscussionModel.aggregate([
        { $match: { courseId, status: { $ne: "deleted" } } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      DiscussionModel.aggregate([
        { $match: { courseId, status: { $ne: "deleted" } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            discussions: { $sum: 1 },
            views: { $sum: "$viewCount" }
          }
        },
        { $sort: { _id: 1 } },
        { $limit: parseInt(period) }
      ])
    ]);

    res.status(200).json({
      success: true,
      courseId,
      period,
      stats: {
        totalDiscussions,
        totalReplies,
        totalViews,
        recentDiscussions,
        recentReplies,
        categoryBreakdown,
        activityTimeline
      }
    });
  } catch (error) {
    controllerError(error, res, "Error fetching course statistics");
  }
};

// Get user engagement statistics
module.exports.getUserEngagement = async (req, res, next) => {
  try {
    const { period = "30" } = req.query; // days
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(period));

    // Get user activity breakdown
    const userActivity = await DiscussionModel.aggregate([
      { $match: { createdAt: { $gte: daysAgo }, status: { $ne: "deleted" } } },
      {
        $group: {
          _id: "$author",
          discussions: { $sum: 1 },
          totalViews: { $sum: "$viewCount" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          userName: "$userInfo.userName",
          email: "$userInfo.email",
          role: "$userInfo.role",
          discussions: 1,
          totalViews: 1
        }
      },
      { $sort: { discussions: -1 } }
    ]);

    // Get reply activity
    const replyActivity = await ReplyModel.aggregate([
      { $match: { createdAt: { $gte: daysAgo }, status: "active" } },
      {
        $group: {
          _id: "$author",
          replies: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          userName: "$userInfo.userName",
          email: "$userInfo.email",
          role: "$userInfo.role",
          replies: 1
        }
      },
      { $sort: { replies: -1 } }
    ]);

    // Merge user activity and reply activity
    const userEngagement = userActivity.map(user => {
      const replyData = replyActivity.find(r => r._id.toString() === user._id.toString());
      return {
        ...user,
        replies: replyData ? replyData.replies : 0,
        totalActivity: user.discussions + (replyData ? replyData.replies : 0)
      };
    });

    // Sort by total activity
    userEngagement.sort((a, b) => b.totalActivity - a.totalActivity);

    res.status(200).json({
      success: true,
      period,
      userEngagement
    });
  } catch (error) {
    controllerError(error, res, "Error fetching user engagement statistics");
  }
};

// Get moderation statistics
module.exports.getModerationStats = async (req, res, next) => {
  try {
    // Check if user is lecturer or admin
    if (req.user.role !== "Lecturer" && req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view moderation statistics"
      });
    }

    const [
      pendingApprovals,
      totalModerated,
      moderationActions,
      flaggedContent
    ] = await Promise.all([
      DiscussionModel.countDocuments({ status: "pending_approval" }),
      DiscussionModel.countDocuments({
        $or: [
          { status: "archived" },
          { approvedBy: { $exists: true } }
        ]
      }),
      DiscussionModel.aggregate([
        {
          $match: {
            $or: [
              { approvedBy: { $exists: true } },
              { deletedBy: { $exists: true } }
            ]
          }
        },
        {
          $group: {
            _id: {
              moderator: "$approvedBy",
              action: {
                $cond: [
                  { $ifNull: ["$approvedBy", false] },
                  "approved",
                  "rejected"
                ]
              }
            },
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id.moderator",
            foreignField: "_id",
            as: "moderatorInfo"
          }
        },
        { $unwind: "$moderatorInfo" },
        {
          $project: {
            moderatorName: "$moderatorInfo.userName",
            action: "$_id.action",
            count: 1
          }
        }
      ]),
      DiscussionModel.countDocuments({
        $or: [
          { status: "archived" },
          { status: "locked" }
        ]
      })
    ]);

    // Get recent moderation actions
    const recentModerations = await DiscussionModel.find({
      $or: [
        { approvedBy: { $exists: true } },
        { deletedBy: { $exists: true } }
      ]
    })
      .populate('author', 'userName email')
      .populate('approvedBy', 'userName')
      .populate('deletedBy', 'userName')
      .sort({ updatedAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      stats: {
        pendingApprovals,
        totalModerated,
        moderationActions,
        flaggedContent,
        recentModerations
      }
    });
  } catch (error) {
    controllerError(error, res, "Error fetching moderation statistics");
  }
};

// Get real-time activity feed
module.exports.getActivityFeed = async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;

    // Get recent discussions and replies
    const [recentDiscussions, recentReplies] = await Promise.all([
      DiscussionModel.find({ status: { $ne: "deleted" } })
        .populate('author', 'userName email role')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit) / 2),
      ReplyModel.find({ status: "active" })
        .populate('author', 'userName email role')
        .populate('discussionId', 'title')
        .sort({ createdAt: -1 })
        .limit(parseInt(limit) / 2)
    ]);

    // Combine and sort by creation date
    const activityFeed = [...recentDiscussions, ...recentReplies]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, parseInt(limit))
      .map(item => ({
        type: item.discussionId ? 'reply' : 'discussion',
        id: item._id,
        title: item.title || `Reply to "${item.discussionId?.title}"`,
        content: item.content,
        author: item.author,
        createdAt: item.createdAt,
        courseId: item.courseId || item.discussionId?.courseId,
        metadata: {
          viewCount: item.viewCount,
          replyCount: item.replyCount,
          voteCount: item.voteCount
        }
      }));

    res.status(200).json({
      success: true,
      activityFeed,
      total: activityFeed.length
    });
  } catch (error) {
    controllerError(error, res, "Error fetching activity feed");
  }
};

// Get activity feed for admin dashboard
module.exports.getActivityFeed = async (req, res, next) => {
  try {
    const { limit = 20, type } = req.query;
    
    // Get recent discussions
    const recentDiscussions = await DiscussionModel.find({ status: { $ne: "deleted" } })
      .populate('author', 'userName email role')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .exec();

    // Get recent replies
    const recentReplies = await ReplyModel.find({ status: "active" })
      .populate('author', 'userName email role')
      .populate('discussionId', 'title')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .exec();

    // Get recent user registrations
    const recentUsers = await UserModel.find()
      .select('userName email role createdAt')
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    // Combine and format activities
    const activities = [
      ...recentDiscussions.map(discussion => ({
        type: 'discussion',
        title: 'New Discussion Created',
        message: `"${discussion.title}" by ${discussion.author.userName}`,
        createdAt: discussion.createdAt,
        author: discussion.author,
        relatedDiscussion: discussion._id
      })),
      ...recentReplies.map(reply => ({
        type: 'reply',
        title: 'New Reply Posted',
        message: `Reply to "${reply.discussionId?.title || 'discussion'}" by ${reply.author.userName}`,
        createdAt: reply.createdAt,
        author: reply.author,
        relatedDiscussion: reply.discussionId?._id,
        relatedReply: reply._id
      })),
      ...recentUsers.map(user => ({
        type: 'user',
        title: 'New User Registered',
        message: `${user.userName} (${user.role}) joined the platform`,
        createdAt: user.createdAt,
        author: user
      }))
    ];

    // Sort by creation date (most recent first)
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Limit total results
    const limitedActivities = activities.slice(0, limit);

    res.status(200).json({
      success: true,
      activities: limitedActivities,
      total: limitedActivities.length
    });
  } catch (error) {
    controllerError(error, res, "Error fetching activity feed");
  }
};

// Get notification statistics
module.exports.getNotificationStats = async (req, res, next) => {
  try {
    const [
      totalNotifications,
      unreadNotifications,
      notificationTypes,
      recentNotifications
    ] = await Promise.all([
      NotificationModel.countDocuments(),
      NotificationModel.countDocuments({ isRead: false, isArchived: false }),
      NotificationModel.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      NotificationModel.find({ isArchived: false })
        .populate('recipient', 'userName email')
        .populate('sender', 'userName email')
        .sort({ createdAt: -1 })
        .limit(20)
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalNotifications,
        unreadNotifications,
        notificationTypes,
        recentNotifications
      }
    });
  } catch (error) {
    controllerError(error, res, "Error fetching notification statistics");
  }
};
