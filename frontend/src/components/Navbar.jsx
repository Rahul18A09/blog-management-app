import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// react icons
import {
  FaBars,
  FaDribbble,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Successfully logged out!");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // navItems
  const navItems = [
    { path: "/", link: "Home" },
    { path: "/about", link: "About" },
    { path: "/services", link: "Services" },
    { path: "/blogs", link: "Blogs" },
    { path: "/contact", link: "Contact" },
  ];
  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <nav className="px-4 py-4 max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          {/* Make sure to place your logo.png in the frontend/public folder */}
          <img src="/logo.png" alt="Brand Logo" className="h-10 w-auto" />
          <span>BlogWith<span className="text-orange-500">Rahul</span></span>
        </a>

        {/* navItems for lg devices */}
        <ul className="md:flex gap-12 text-lg hidden">
          {navItems.map(({ path, link }) => (
            <li key={path}>
              {" "}
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold underline underline-offset-4"
                    : "text-white"
                }
              >
                {link}{" "}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* menu icons */}

        <div className="text-white lg:flex gap-4 items-center hidden">
          <a
            href="https://www.facebook.com/rahul_0918"
            className="hover:text-orange-500"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/in/rahul-bharada"
            className="hover:text-orange-500"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/rahul_0918A"
            className="hover:text-orange-500"
          >
            <FaTwitter />
          </a>
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-6 py-2 font-medium rounded text-white hover:bg-white hover:text-gray-800 transition-all duration-200 ease-in"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-orange-500 px-6 py-2 font-medium rounded text-white hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in"
            >
              Log in
            </NavLink>
          )}
        </div>

        {/* mobile menu btn, display on  mobile screen */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>
      {/* meno items only for mobile  */}
      <div>
        <ul
          className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"}`}
        >
          {navItems.map(({ path, link }) => (
            <li className="text-black" key={path}>
              <NavLink onClick={toggleMenu} to={path}>
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
