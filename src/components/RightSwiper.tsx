"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const RightSwiper = () => {
  // Right slider data

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
  const rightSlides = [
    {
      id: 5,
      title: "LaForza",
      description: "Coded from scratch using React and NextJS, with Supabase",
      image: "/img/laforza_screen.png",
      href: "laforza-five.vercel.app",
    },
    {
      id: 6,
      title: "KorteAfiado",
      description: "Used Webflow for the development",
      image: "/img/korteafiado_screen.png",
      href: "korteafiado.pt",
    },
    {
      id: 7,
      title: "GeniuneAim",
      description: "Used Webflow for the development",
      image: "/img/genuineaim_screen.png",
      href: "genuineaim.com",
    },
    {
      id: 8,
      title: "Signal AI",
      description: "Full time for Signal AI as Software Engineer",
      image: "/img/signal_screen.png",
      href: "signalai.com",
    },
  ];

  return (
    <div className="col-span-4 flex items-center justify-center relative">
      <div className={`w-full ${isMobile ? 'mt-10 h-[200px]' : 'h-[600px]'} max-w-sm relative`}>
        {/* Top Navigation Button */}
        {!isMobile && (
        <button 
          className="swiper-button-prev-right absolute -top-12 left-[50%] ml-[-20px] z-30 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-white/30 transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        )}
        <Swiper
          direction={direction}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={isMobile ? 2 : 3}
          spaceBetween={20}
          loop={true}
          navigation={{
            prevEl: '.swiper-button-prev-right',
            nextEl: '.swiper-button-next-right',
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          speed={1500}
          modules={[Navigation, Autoplay]}
          className="vertical-swiper-right h-full"
        >
          {rightSlides.map((slide) => (
            <SwiperSlide key={slide.id} className="swiper-slide-custom">
              <div className="slide-content rounded-lg p-4 transition-all duration-300 h-full">
                <div className="flex flex-col items-center justify-center space-y-3 h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    title={slide.description}
                    onClick={() => slide.href && window.open(`https://${slide.href}`, '_blank')}
                    
                    className={'w-64 h-64 md:w-40 md:h-40 lg:w-46 lg:h-46 xl:w-64 xl:h-64 object-cover rounded-lg transition-transform duration-300 slide-image cursor-pointer'}

                  />
                  <h3 className="font-orbitron text-white text-lg font-bold text-center">
                    {slide.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom Navigation Button */}
        {!isMobile && (
          <button 
            className="swiper-button-next-right absolute left-[50%] ml-[-20px] -bottom-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center border border-white/30 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default RightSwiper; 