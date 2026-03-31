import React from 'react';
import { FaUserPlus, FaTwitter, FaLinkedin } from 'react-icons/fa';

const authors = [
  {
    id: 1,
    name: 'Rahul Bharada',
    role: 'Founder & Lead Author',
    bio: 'Passionate web developer and tech blogger. Sharing knowledge on MERN stack, React, and modern web development.',
    articles: 124,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Aisha Sharma',
    role: 'Tech Enthusiast',
    bio: 'Writing about emerging technologies, UI/UX design trends, and how to build user-friendly digital experiences.',
    articles: 45,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    role: 'Backend Engineer',
    bio: 'Deep diving into server-side architectures, database optimization, and mastering scalable Node.js backends.',
    articles: 32,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Priya Patel',
    role: 'Content Strategist',
    bio: 'Focusing on content marketing, SEO best practices, and helping developers write better technical documentation.',
    articles: 56,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
  }
];

const PopularAuthors = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Popular Authors</h2>
          <p className="text-gray-600 mt-3">
            Read from our most experienced and loved contributors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map((author) => (
            <div key={author.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col items-center p-6 pb-8">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-orange-100"
              />
              <h3 className="text-xl font-bold text-gray-800">{author.name}</h3>
              <p className="text-orange-500 font-medium text-sm mb-3">{author.role}</p>
              <p className="text-gray-600 text-center text-sm mb-6 flex-grow">{author.bio}</p>
              
              <div className="w-full flex justify-between items-center mb-6 px-2">
                <span className="text-sm text-gray-500 font-medium border-b-2 border-orange-500 pb-1 mr-4">{author.articles} Articles</span>
                <div className="flex gap-3 text-gray-400">
                  <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitter /></a>
                  <a href="#" className="hover:text-blue-700 transition-colors"><FaLinkedin /></a>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <FaUserPlus /> Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAuthors;
