const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Super Admin',
    email: 'admin@example.com',
    password: 'password123', // Will be hashed in seeder
    role: 'superadmin',
  },
  {
    name: 'Normal User 1',
    email: 'user1@example.com',
    password: 'password123', // Will be hashed in seeder
    role: 'user',
  },
  {
    name: 'Normal User 2',
    email: 'user2@example.com',
    password: 'password123', // Will be hashed in seeder
    role: 'user',
  },
];

const blogs = [
  {
    title: 'First Dummy Blog',
    content: 'This is the content of the first dummy blog. It contains some basic text to demonstrate how a blog post might look in the application.',
  },
  {
    title: 'Second Dummy Blog',
    content: 'This is another piece of content. We need dummy data to ensure everything is working correctly on the frontend.',
  },
  {
    title: 'Learning Node.js',
    content: 'Node.js is a powerful JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows developers to build scalable network applications.',
  },
];

module.exports = { users, blogs };
