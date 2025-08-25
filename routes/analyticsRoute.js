const express = require('express');
const router = express.Router();
const {
  getForumStats,
  getCourseStats,
  getUserEngagement,
  getModerationStats,
  getActivityFeed,
  getNotificationStats
} = require('../controllers/analyticsController');

const { requireLogin } = require('../middlewares/requireLogin');
const { adminAuthentication } = require('../middlewares/authentication');

// Forum statistics
router.get('/forum/stats', requireLogin, adminAuthentication, getForumStats);

// Course-specific statistics
router.get('/course/:courseId/stats', requireLogin, adminAuthentication, getCourseStats);

// User engagement metrics
router.get('/user/engagement', requireLogin, adminAuthentication, getUserEngagement);

// Moderation statistics
router.get('/moderation/stats', requireLogin, adminAuthentication, getModerationStats);

// Activity feed
router.get('/activity/feed', requireLogin, adminAuthentication, getActivityFeed);

// Notification statistics
router.get('/notification/stats', requireLogin, adminAuthentication, getNotificationStats);

module.exports = router;
