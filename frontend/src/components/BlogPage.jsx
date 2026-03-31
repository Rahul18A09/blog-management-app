import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogCards from "./BlogCards";
import Pagination from "./Pagination";
import CategorySection from "./CategorySection";
import SideBar from "./SideBar";


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

  const totalPages = Math.ceil(filteredBlogs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + pageSize);

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

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

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

      {/* Blog Cards */}
      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl mx-auto">
        <div className="w-full lg:w-3/4">
          
          {/* Search Bar */}
          <div className="mb-6 relative">
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
              className="w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
          </div>

          <BlogCards blogs={paginatedBlogs} />
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            {totalPages > 1 && (
              <Pagination
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalItems={filteredBlogs.length}
                pageSize={pageSize}
              />
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/4">
          <SideBar />
        </div>
      </div>


    </div>
  );
}

export default BlogPage;
