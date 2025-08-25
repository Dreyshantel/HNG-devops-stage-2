const express = require('express');
const router = express.Router();
const {
  createReply,
  getDiscussionReplies,
  updateReply,
  deleteReply,
  voteReply,
  removeVote,
  markAsSolution,
  getReply
} = require('../controllers/replyController');

const { requireLogin } = require('../middlewares/requireLogin');
const { teacherAuthentication } = require('../middlewares/authentication');

// Public routes (require login)
router.get('/discussion/:discussionId', requireLogin, getDiscussionReplies);
router.get('/:replyId', requireLogin, getReply);

// Protected routes (require login + role check)
router.post('/create', requireLogin, createReply);
router.put('/:replyId', requireLogin, updateReply);
router.delete('/:replyId', requireLogin, deleteReply);

// Voting routes
router.post('/:replyId/vote', requireLogin, voteReply);
router.delete('/:replyId/vote', requireLogin, removeVote);

// Moderator routes (lecturer/admin only)
router.post('/:replyId/mark-solution', requireLogin, teacherAuthentication, markAsSolution);

module.exports = router;

