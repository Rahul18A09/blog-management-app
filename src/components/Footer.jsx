
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = ({ categories = [] }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    alert("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">BlogWith<span className='text-orange-500'>Rahul</span></h2>
          <p className="text-sm leading-6 mb-4">
            A modern blog platform built with React & Tailwind CSS.
            Explore tutorials, tech insights, and development tips.
          </p>

          <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com/rahul_0918" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com/rahul_0918A" className="hover:text-orange-500 transition">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/in/rahul-bharada" className="hover:text-orange-500 transition">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com/Rahul18A09" className="hover:text-orange-500 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-orange-500 transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-orange-500 transition">Serives</Link></li>
            <li><Link to="/about" className="hover:text-orange-500 transition">About</Link></li>
            <li><Link to="/blogs" className="hover:text-orange-500 transition">Blogs</Link></li>
            <li><Link to="/contact" className="hover:text-orange-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-3 text-sm">
            {categories.slice(0, 6).map((category, index) => (
              <li key={index}>
                <Link
                  to="/blogs"
                  className="hover:text-orange-500 transition"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Subscribe for Updates
          </h3>

          <p className="text-sm mb-4">
            Get the latest articles delivered straight to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex items-center bg-gray-700 rounded overflow-hidden"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-transparent outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-orange-500 px-4 py-2 hover:bg-orange-600 transition"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-5 text-sm">
        © {new Date().getFullYear()} BlogWithRahul. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

