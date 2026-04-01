
import React, { useState } from "react";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        toast.success("Message sent successfully! We'll be in touch.");
        setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 mb-[-80px]">

      {/* Hero Section */}
      <div className="py-32 bg-black text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          For collaborations, guest posts, partnerships, or general inquiries,
          feel free to reach out.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">

        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Let’s Connect
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We welcome collaboration opportunities, guest contributions,
            startup features, media inquiries, and technology discussions.
            Whether you represent a company, startup, or simply want to
            share feedback — we would love to hear from you.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold">General Inquiries:</span><br />
              contact@yourblog.com
            </p>

            <p>
              <span className="font-semibold">Partnerships & Media:</span><br />
              media@yourblog.com
            </p>

            <p>
              <span className="font-semibold">Response Time:</span><br />
              Within 24–48 hours
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block mb-2 font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>General Inquiry</option>
                <option>Guest Post Submission</option>
                <option>Collaboration</option>
                <option>Media & Partnership</option>
                <option>Startup Feature Request</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;

