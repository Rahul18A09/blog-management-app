import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const slidesData = [
  {
    title: "Welcome to Our Blog",
    desc: "Start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas. We offer everything you need to get started.",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
    linkText: "Learn more",
    linkTo: "/"
  },
  {
    title: "Insightful Articles Await",
    desc: "Dive into a vast collection of in-depth articles spanning multiple domains. Read, learn, and grow your knowledge base with expert insights.",
    img: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop",
    linkText: "Read Articles",
    linkTo: "/blogs"
  },
  {
    title: "Write, Share, Inspire",
    desc: "Got a story to tell or expertise to share? Become an author on our platform and reach directly to an audience that values quality content.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead2708?q=80&w=2105&auto=format&fit=crop",
    linkText: "Start Writing",
    linkTo: "/services"
  }
]

function Banner() {
  return (
    <div className="bg-black mx-auto">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>
              
              {/* Content */}
              <div className="relative z-10 text-white text-center px-4">
                <h1 className="text-5xl lg:text-7xl leading-snug font-bold mb-5 drop-shadow-lg">{slide.title}</h1>
                <p className="text-gray-200 lg:w-3/5 mx-auto mb-8 drop-shadow-md text-lg">{slide.desc}</p>
                <div>
                  <Link to={slide.linkTo} className='font-medium bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-white hover:text-orange-500 transition-colors duration-300 inline-flex items-center shadow-lg hover:shadow-xl'>
                    {slide.linkText} <FaArrowRight className='mt-1 ml-2' />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Banner
