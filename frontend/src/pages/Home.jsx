import React from "react";
import Banner from "../components/Banner";
import BlogPage from "../components/BlogPage";
import PopularAuthors from "../components/PopularAuthors";

function Home() {
  return (
    <div className="bg-gray-50 mb-[-80px]">
      {/* Hero Section */}
      <section>
        <Banner />
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Latest Articles</h2>
          <p className="text-gray-600 mt-3">
            Explore our latest insights and updates
          </p>
        </div>

        <BlogPage />
      </section>
      
      {/* Popular Authors Section */}
      <PopularAuthors />
    </div>
  );
}

export default Home;
