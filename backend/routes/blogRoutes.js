const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect, superadmin } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, superadmin, createBlog);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, superadmin, updateBlog)
  .delete(protect, superadmin, deleteBlog);

module.exports = router;
