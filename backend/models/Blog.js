const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
    authorName: {
      type: String,
    },
    authorPic: {
      type: String,
    },
    published_date: {
      type: String,
    },
    reading_time: {
      type: String,
    },
    tags: {
      type: [String],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
