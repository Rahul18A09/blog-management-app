const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { users } = require('./data/dummyData');
const blogsJson = require('../public/api/blogsData.json');
const User = require('./models/User');
const Blog = require('./models/Blog');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const usersWithHashedPasswords = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, salt),
    }));

    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    const superAdminUserId = createdUsers[0]._id;

    const sampleBlogs = blogsJson.map((blog) => {
      // Create a copy of blog payload matching our schema
      return {
        title: blog.title,
        content: blog.content,
        image: blog.image,
        category: blog.category,
        authorName: blog.author,
        authorPic: blog.authorPic,
        published_date: blog.published_date,
        reading_time: blog.reading_time,
        tags: blog.tags,
        author: superAdminUserId,
      };
    });

    await Blog.insertMany(sampleBlogs);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Blog.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
