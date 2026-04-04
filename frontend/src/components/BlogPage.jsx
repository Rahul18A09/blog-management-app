import React, { useEffect, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import BlogCards from "./BlogCards";
import Pagination from "./Pagination";
import CategorySection from "./CategorySection";


function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        let data = await res.json();
        data = data.map(item => ({...item, id: item._id, author: item.authorName || item.author}));
        // Sort by newest first
        data.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
        setBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isFilterActive = selectedCategory !== "All" || searchQuery !== "";
  
  let featuredBlogs = [];
  let blogsForPagination = filteredBlogs;

  if (!isFilterActive && filteredBlogs.length >= 3) {
    featuredBlogs = filteredBlogs.slice(0, 3);
    blogsForPagination = filteredBlogs.slice(3);
  }

  const totalPages = Math.ceil(blogsForPagination.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedBlogs = blogsForPagination.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredBlogs, totalPages]);

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category).filter(c => c && c.trim() !== ""))];

  return (
    <div className="p-8 flex flex-col items-center">
      {/* Category Section */}
      <div className="w-full mb-8">
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Main Content Area without Sidebar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        {/* Featured Latest Row (Only visible on page 1 without filters) */}
        {featuredBlogs.length === 3 && (
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-6 border-b pb-2">Featured Latest</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredBlogs.map(blog => (
                <Link to={`/blogs/${blog.id}`} key={blog.id} className="relative rounded-2xl overflow-hidden shadow-lg group h-72 block">
                  <img src={blog.image} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" alt={blog.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                    <span className="text-orange-500 font-bold text-xs uppercase mb-2 tracking-wider">{blog.category}</span>
                    <h4 className="text-white font-bold text-lg mb-2 line-clamp-2">{blog.title}</h4>
                    <p className="text-gray-300 text-xs flex items-center gap-2">
                       <FaUser /> {blog.author} &bull; {blog.published_date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="w-full">
          {/* Search Bar */}
          <div className="mb-8 relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search blogs by title..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition"
            />
          </div>

          <BlogCards blogs={paginatedBlogs} />
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            {totalPages > 1 && (
              <Pagination
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalItems={blogsForPagination.length}
                pageSize={pageSize}
              />
            )}
          </div>
        </div>
      </div>


    </div>
  );
}

export default BlogPage;
