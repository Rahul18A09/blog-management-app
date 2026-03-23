import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SideBar = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        let data = await res.json();
        data = data.map(item => ({...item, id: item._id, author: item.authorName || item.author}));

        // Example: get latest 5 blogs
        const sorted = [...data].sort(
          (a, b) => new Date(b.published_date) - new Date(a.published_date),
        );

        setPopularBlogs(sorted.slice(0, 15));
      } catch (error) {
        console.error("Error fetching popular blogs:", error);
      }
    };

    fetchPopularBlogs();
  }, []);

  return (
    //  <div className="bg-gray-100 p-4 rounded-lg">
    //   <h3 className="text-2xl font-semibold mb-4">Latest Blogs</h3>

    //   {popularBlogs.map((blog) => (
    //     <Link
    //       key={blog.id}
    //       to={`/blog/${blog.id}`}
    //       className="block mb-3 hover:text-blue-600"
    //     >
    //       {blog.title}
    //     </Link>
    //   ))}
    // </div>

    <div className="bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-2xl font-bold mb-6 border-b pb-3">Latest Blogs</h3>

      <div className="space-y-4">
        {popularBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            className="flex gap-4 items-center hover:bg-gray-100 p-3 rounded-lg transition"
          >
            {/* Thumbnail */}
            <img
              src={blog.image}
              alt={blog.title}
              className="w-20 h-20 object-cover rounded-lg"
            />

            {/* Content */}
            <div>
              <h4 className="font-semibold text-sm hover:text-blue-600 line-clamp-2">
                {blog.title}
              </h4>

              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <FaUser className="text-gray-400" />
                {blog.author}
              </p>

              <p className="text-xs text-gray-400">{blog.published_date}</p>

              {/* Read More */}
              <span className="text-xs text-blue-600 flex items-center gap-1 mt-2 font-medium hover:underline">
                Read More
                <FaArrowRight className="text-xs" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
