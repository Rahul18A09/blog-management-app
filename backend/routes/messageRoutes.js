const express = require('express');
const router = express.Router();

const {
  createMessage,
  getMessages,
  deleteMessage,
  markAllAsRead,
} = require('../controllers/messageController');

const { protect, superadmin } = require('../middleware/authMiddleware');

// Public route to submit contact form
router.route('/').post(createMessage);

// Protected routes for admin usage
router.route('/').get(protect, superadmin, getMessages);
router.route('/mark-read').put(protect, superadmin, markAllAsRead);
router.route('/:id').delete(protect, superadmin, deleteMessage);

module.exports = router;
