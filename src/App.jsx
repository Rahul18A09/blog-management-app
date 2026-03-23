import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SingleBlog from "./components/SingleBlog";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreateBlog from "./pages/admin/AdminCreateBlog";
import AdminUpdateBlog from "./pages/admin/AdminUpdateBlog";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar/>}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/:id"  element={<SingleBlog/>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-blog" element={<AdminCreateBlog />} />
        <Route path="/admin/update-blog/:id" element={<AdminUpdateBlog />} />

        {/* 404 Route */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
       {!isAdminRoute && <Footer/>}
    </>
  ); 
}

export default App;
