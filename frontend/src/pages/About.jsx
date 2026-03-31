// import React from "react";

// function About() {
//   return (
//     <div>
//       <div className="py-40 bg-black text-center text-white px-4 mb-[-80px]">
//         <h1 className="text-5xl lg:text-7xl leading-snug font-bold mb-5">
//           About Us Page
//         </h1>
//       </div>
//     </div>
//   );
// }

// export default About;


import React from "react";

function About() {
  return (
    <div className="bg-gray-50 mb-[-80px]">

      {/* Hero Section */}
      <div className="py-32 bg-black text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About Our Platform
        </h1>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg">
          A modern knowledge hub covering Technology, Innovation, Health,
          Artificial Intelligence, Fintech, Startups, Enterprise Solutions,
          and Digital Growth.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Who We Are */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Who We Are
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            Our blog is dedicated to delivering insightful, practical and
            forward-thinking content across diverse industries including
            Health, Technology, Artificial Intelligence, Fintech, Startups,
            Enterprise systems, Cybersecurity, Work culture, and emerging
            digital trends. We aim to simplify complex topics and provide
            readers with valuable knowledge that supports both personal and
            professional growth.
          </p>
        </div>

        {/* Our Focus Areas */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Focus Areas
          </h2>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">

            {[
              "Health & Wellness",
              "Technology & Innovation",
              "Artificial Intelligence",
              "Fintech & Digital Economy",
              "Startups & Entrepreneurship",
              "Cybersecurity & Enterprise",
              "Business Growth Strategies",
              "Apps & Digital Products",
              "Work Culture & Productivity",
              "Gadgets & Emerging Tools",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {item}
                </h3>
                <p className="text-gray-600 text-sm mt-3">
                  In-depth articles, trends, analysis, and practical insights
                  designed to keep readers informed and ahead in this field.
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Our Mission */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
            Our mission is to bridge the gap between complex innovation and
            everyday understanding. We strive to create high-quality, reliable
            and research-driven content that empowers individuals,
            professionals, and businesses to adapt, grow, and succeed in the
            fast-evolving digital world.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-blue-600 text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Vision
          </h2>
          <p className="max-w-3xl mx-auto text-lg">
            To become a trusted digital resource for knowledge, innovation,
            and growth by delivering meaningful content that inspires informed
            decisions and future-ready thinking.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;

