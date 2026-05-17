const Blog = require('../models/Blog');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private / Super Admin
const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Users
    const totalUsers = await User.countDocuments();

    // 2. Total Blogs & Total Views
    const blogs = await Blog.find({});
    const totalBlogs = blogs.length;
    const totalViews = blogs.reduce((acc, blog) => acc + (blog.views || 0), 0);

    // 3. Category Distribution (Doughnut Chart Data)
    const categoryCounts = {};
    blogs.forEach(blog => {
      const cat = blog.category || 'Others';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const categoryColors = {
      'Technology': '#FF7A00',
      'AI': '#3B82F6',
      'Startup': '#A855F7',
      'Marketing': '#22C55E',
      'Security': '#EF4444',
      'Apps': '#EAB308',
      'Fintech': '#14B8A6'
    };

    const topCategories = Object.keys(categoryCounts).map((key, index) => {
      // Calculate percentage based on total blogs
      const percentage = totalBlogs > 0 ? Math.round((categoryCounts[key] / totalBlogs) * 100) : 0;
      
      // Assign a default color if category not in predefined list
      const fallbackColors = ['#FF7A00', '#3B82F6', '#A855F7', '#22C55E', '#9CA3AF'];
      const color = categoryColors[key] || fallbackColors[index % fallbackColors.length];

      return {
        name: key,
        value: percentage,
        count: categoryCounts[key],
        color: color
      };
    }).sort((a, b) => b.value - a.value); // Sort descending

    // 4. Latest Blogs
    const latestBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(10).populate('author', 'name email');

    res.json({
      totalUsers,
      totalBlogs,
      totalViews,
      topCategories,
      latestBlogs
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
};

module.exports = {
  getDashboardStats
};
