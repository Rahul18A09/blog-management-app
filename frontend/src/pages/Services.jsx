// import React from 'react'

// function Services() {
//   return (
//     <div>
//      <div className='py-40 bg-black text-center text-white px-4 mb-[-80px]'>
//       <h1 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">Services Page</h1>
//     </div>
//     </div>
//   )
// }

// export default Services


import React from "react";
import {
  FaHeartbeat,
  FaRobot,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaLaptopCode,
  FaMobileAlt,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaHeartbeat size={40} />,
      title: "Health & Digital Health Insights",
      description:
        "In-depth coverage of healthcare innovation, digital health platforms, biotech advancements, and emerging medical technologies shaping the future.",
    },
    {
      icon: <FaRobot size={40} />,
      title: "Technology & AI Intelligence",
      description:
        "Expert analysis on artificial intelligence, automation, machine learning, and emerging technologies transforming industries worldwide.",
    },
    {
      icon: <FaChartLine size={40} />,
      title: "Fintech & Digital Finance",
      description:
        "Insights into fintech innovation, digital payments, blockchain ecosystems, and the evolution of global financial systems.",
    },
    {
      icon: <FaRocket size={40} />,
      title: "Startups & Growth Strategy",
      description:
        "Practical knowledge on entrepreneurship, startup ecosystems, funding strategies, scaling models, and sustainable business growth.",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Security & Enterprise Solutions",
      description:
        "Analysis of cybersecurity trends, enterprise software systems, data protection strategies, and business infrastructure modernization.",
    },
    {
      icon: <FaLaptopCode size={40} />,
      title: "Apps, Work & Productivity",
      description:
        "Exploration of digital tools, workplace innovation, remote work trends, and productivity-enhancing technologies.",
    },
    {
      icon: <FaMobileAlt size={40} />,
      title: "Gadgets & Consumer Technology",
      description:
        "Coverage of the latest gadgets, product innovations, and consumer technologies influencing everyday digital life.",
    },
  ];

  return (
    <div className="bg-gray-50 mb-[-80px]">

      {/* Hero Section */}
      <div className="py-32 bg-black text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Our Services
        </h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          Delivering expert insights, industry intelligence, and in-depth analysis 
          across technology, business, and innovation-driven sectors.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="text-blue-600 mb-6 flex justify-center">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      <div className="bg-blue-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Stay Ahead of Innovation
        </h2>
        <p className="mb-8 text-lg">
          Explore insights that empower smarter decisions in a rapidly evolving world.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Explore Articles
        </button>
      </div>

    </div>
  );
}

export default Services;


