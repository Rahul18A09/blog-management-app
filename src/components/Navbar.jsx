import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// react icons
import { FaBars, FaDribbble, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6';




function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    // navItems
    const navItems = [
        {path:"/", link:"Home"},
        {path:"/services", link:"Services"},
        {path:"/about", link:"About"},
        {path:"/blogs", link:"Blogs"},
        {path:"/contact", link:"Contact"},
    ]
  return (
   <header className='bg-black text-white fixed top-0 left-0 right-0 z-50'>
    <nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
        <a href="/" className='text-xl font-bold text-white'>BlogWith<span className='text-orange-500'>Rahul</span></a>

        {/* navItems for lg devices */}
        <ul className="md:flex gap-12 text-lg hidden">
  {navItems.map(({ path, link }) => (
    <li key={path}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? "text-orange-500 font-semibold underline underline-offset-4"
            : "text-white"
        }
      >
        {link}
      </NavLink>
    </li>
  ))}
</ul>


        {/* menu icons */}

        <div className='text-white lg:flex gap-4 items-center hidden'>
           <a href="https://www.facebook.com/rahul_0918" className='hover:text-orange-500'><FaFacebook/></a>
           <a href="https://www.linkedin.com/in/rahul-bharada" className="hover:text-orange-500"><FaLinkedin/></a>
           <a href="https://twitter.com/rahul_0918A" className='hover:text-orange-500'><FaTwitter/></a>
           {/* <button className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in'>Log in</button> */}
           <button
  onClick={() => setIsOpen(true)}
  className="bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in"
>
  Log in
</button>

        </div>

        {/* mobile menu btn, display on  mobile screen */}
        <div className='md:hidden'>
         <button onClick={toggleMenu} className='cursor-pointer'>{isMenuOpen? <FaXmark className='w-5 h-5'/> : <FaBars className='w-5 h-5'/>}</button>
        </div>
     </nav> 
        {/* meno items only for mobile  */}
        <div>
             <ul className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"}`}>
            {
                navItems.map(({path, link}) => <li className='text-black' key={path}><NavLink onClick={toggleMenu} to={path}>{link}</NavLink></li>)
            }
        </ul>
        </div>

      {isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

    {/* Modal Box */}
    <div className="bg-white w-[90%] max-w-md p-8 rounded-2xl relative">

      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h2 className="text-black font-bold mb-6 text-center">
        Login to Your Account
      </h2>

      <form className="space-y-5">

        <div>
          <label className="text-orange-500 block mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="text-orange-500 block mb-2 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Login
        </button>

      </form>

    </div>
  </div>
)}

       
   
   </header>
  )
}

export default Navbar
