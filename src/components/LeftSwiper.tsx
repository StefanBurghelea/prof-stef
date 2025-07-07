"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const LeftSwiper = () => {
  
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md: breakpoint
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  const direction = isMobile ? 'horizontal' : 'vertical';
  const leftSlides = [
    {
      title: "Python",
      image: "/img/python512.png"
    },
    {
      title: "Django",
      image: "/img/django512.png"
    },
    {
      title: "React",
      image: "/img/logo512.png"
    },
    {
      title: "Angular",
      image: "/img/angular512.png"
    },
  ];

  return (
    <div className="col-span-4 flex items-center justify-center relative">
      <div className={`w-full ${isMobile ? 'h-[200px]' : 'h-[600px]'} max-w-sm relative`}>
        <Swiper
          direction={direction}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          navigation={{
            prevEl: '.swiper-button-prev-left',
            nextEl: '.swiper-button-next-left',
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          speed={1500}
          modules={[Navigation, Autoplay]}
          className={`vertical-swiper-left h-full ${isMobile ? 'h-0px' : 'h-[600px]'}`}
        >
          {leftSlides.map((slide, index) => (
            <SwiperSlide key={index} className="swiper-slide-custom pt-16">
              <div className="slide-content rounded-lg p-4 transition-all duration-300 h-full">
                <div className="flex flex-col items-center justify-center space-y-3 h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className={`${isMobile ? 'w-16 h-16' : 'w-28 h-28'} object-contain rounded-lg transition-transform duration-300 slide-image cursor-pointer grayscale hover:grayscale-0`}
                  />
                  <h3 className="font-orbitron text-white text-lg font-bold text-center">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LeftSwiper; 