"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface Slide {
  id?: number;
  title: string;
  description?: string;
  image: string;
  href?: string;
}

interface SwiperComponentProps {
  slides: Slide[];
  variant?: 'left' | 'right';
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ 
  slides, 
  variant = 'left'
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const direction = isMobile ? 'horizontal' : 'vertical';
  const isLeftVariant = variant === 'left';

  return (
    <div className="col-span-4 flex items-center justify-center relative">
      <div className={`w-full ${isMobile ? (isLeftVariant ? 'h-[200px]' : 'mt-10 h-[200px]') : 'h-[600px]'} max-w-sm relative`}>
        <Swiper
          direction={direction}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={isMobile ? 2 : 3}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={1500}
          modules={[Autoplay]}
          className={`vertical-swiper-${variant} h-full ${isMobile && isLeftVariant ? 'h-0px' : ''}`}
        >
          {slides.map((slide, index) => (
            <SwiperSlide 
              key={slide.id || index} 
              className={`swiper-slide-custom ${isLeftVariant ? 'pt-16' : ''}`}
            >
              <div className="slide-content rounded-lg p-4 transition-all duration-300 h-full">
                <div className="flex flex-col items-center justify-center space-y-3 h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    title={slide.description}
                    onClick={() => slide.href && window.open(`https://${slide.href}`, '_blank')}
                    className={
                      isLeftVariant
                        ? `${isMobile ? 'w-16 h-16' : 'w-28 h-28'} object-contain rounded-lg transition-transform duration-300 slide-image cursor-pointer grayscale hover:grayscale-0`
                        : 'w-64 h-64 md:w-40 md:h-40 lg:w-46 lg:h-46 xl:w-64 xl:h-64 object-cover rounded-lg transition-transform duration-300 slide-image cursor-pointer'
                    }
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

export default SwiperComponent;

