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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCreateBlog from "./pages/admin/AdminCreateBlog";
import AdminUpdateBlog from "./pages/admin/AdminUpdateBlog";
import AdminMessages from "./pages/admin/AdminMessages";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import Auth from "./pages/Auth";
import AdminLayout from "./components/AdminLayout";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {!isAdminRoute && <Navbar/>}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/blogs/:id" element={<UserProtectedRoute><SingleBlog/></UserProtectedRoute>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<Auth />} />
        <Route path="/admin/login" element={<Auth />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
          <Route path="/admin/create-blog" element={<ProtectedRoute><AdminCreateBlog /></ProtectedRoute>} />
          <Route path="/admin/update-blog/:id" element={<ProtectedRoute><AdminUpdateBlog /></ProtectedRoute>} />
          {/* Placeholders for new sidebar navigation to avoid 404s */}
          <Route path="/admin/super-admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/subadmin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/popular-author" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Route>

        {/* 404 Route */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
       {!isAdminRoute && <Footer/>}
    </>
  ); 
}

export default App;
