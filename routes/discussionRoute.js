const express = require('express');
const router = express.Router();
const {
  createDiscussion,
  getCourseDiscussions,
  getDiscussion,
  updateDiscussion,
  deleteDiscussion,
  moderateDiscussion,
  togglePinDiscussion,
  searchDiscussions,
  getPendingItems
} = require('../controllers/discussionController');

const { requireLogin } = require('../middlewares/requireLogin');
const { teacherAuthentication, adminAuthentication } = require('../middlewares/authentication');

// Public routes (require login)
router.get('/course/:courseId', requireLogin, getCourseDiscussions);
router.get('/search', requireLogin, searchDiscussions);
router.get('/:discussionId', requireLogin, getDiscussion);

// Protected routes (require login + role check)
router.post('/create', requireLogin, createDiscussion);
router.put('/:discussionId', requireLogin, updateDiscussion);
router.delete('/:discussionId', requireLogin, deleteDiscussion);

// Moderator routes (lecturer/admin only)
router.get('/pending', requireLogin, adminAuthentication, getPendingItems);
router.post('/:discussionId/moderate', requireLogin, teacherAuthentication, moderateDiscussion);
router.post('/:discussionId/toggle-pin', requireLogin, teacherAuthentication, togglePinDiscussion);

module.exports = router;
