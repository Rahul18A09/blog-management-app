const Blog = require('../models/Blog');

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public (or Super Admin, based on requirements, assuming getters are public, modify if needed to be Super Admin only)
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('author', 'name email');
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    
    if (blog) {
      // Increment views
      blog.views = (blog.views || 0) + 1;
      await blog.save();
      
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private / Super Admin
const createBlog = async (req, res) => {
  try {
    const { 
      title, 
      content,
      image,
      category,
      authorName,
      authorPic,
      published_date,
      reading_time,
      tags,
      status
    } = req.body;

    const blog = new Blog({
      title,
      content,
      image,
      category,
      authorName,
      authorPic,
      published_date,
      reading_time,
      tags,
      status: status || 'Published',
      author: req.user._id, // Assign the superadmin as the author
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private / Super Admin
const updateBlog = async (req, res) => {
  try {
    const { 
      title, 
      content,
      image,
      category,
      authorName,
      authorPic,
      published_date,
      reading_time,
      tags,
      status
    } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.image = image !== undefined ? image : blog.image;
      blog.category = category || blog.category;
      blog.authorName = authorName || blog.authorName;
      blog.authorPic = authorPic || blog.authorPic;
      blog.published_date = published_date || blog.published_date;
      blog.reading_time = reading_time || blog.reading_time;
      blog.tags = tags || blog.tags;
      blog.status = status || blog.status;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private / Super Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
