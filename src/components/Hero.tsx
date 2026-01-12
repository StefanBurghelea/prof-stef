"use client";

import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaGlobe, FaFilePdf } from 'react-icons/fa';
import SwiperComponent from './SwiperComponent';
import AiAgent from './AiAgent';

const Hero = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const technologySlides = [
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
    {
      title: "FastAPI",
      image: "/img/fastapi.png"
    },
  ];

  const projectSlides = [
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
    {
      id: 9,
      title: "Portfolio PDF",
      description: "Preview of the portfolio",
      image: "/img/preview_portfolio.png",
      href: `${baseUrl}/do/cv06-23.pdf`,
      },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const toggleChat = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  return (
    <div 
      className="hero-container h-dvw min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center" 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ 
          backgroundImage: "url('/img/background.png')", 
          backgroundSize: "auto", 
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: mousePosition.x && mousePosition.y 
            ? `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 40%, transparent 70%)`
            : 'transparent',
        }}
      />
      
      <div className="relative z-10 h-full grid grid-cols-12 gap-4 p-4">
        
        <SwiperComponent 
          slides={technologySlides}
          variant="left"
        />

        <div className={`col-span-4 flex flex-col transition-all duration-700 ease-in-out ${
          isChatExpanded ? 'justify-start pt-8' : 'justify-center items-center'
        }`}>
          <div className={`text-center space-y-4 transition-all duration-700 ease-in-out transform ${
            isChatExpanded ? 'scale-75' : 'scale-100'
          }`}>
            <h2 className="font-orbitron text-white/80 text-lg sm:text-xl md:text-2xl 2xl:text-xl font-semibold">
              Stefan Burghelea
            </h2>
            <h1 className="font-orbitron text-green-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold leading-tight xl:whitespace-nowrap md:whitespace-normal">
              Software Engineer
            </h1>
            
            <div className="space-y-2">
              <p className="text-white/80 text-sm md:text-base 2xl:text-sm max-w-md mx-auto leading-relaxed">
              Hi, I’m backend-focused software engineer from Portugal with 4+ years of experience.I specialize in building scalable APIs, backend systems, and integrating modern web services.Open to freelance and new challenges — feel free to chat with me using the AI assistant.
              </p>
            </div>
            
            <div className="flex justify-center items-center space-x-6 pt-4">
              {[
                {
                  href: "https://www.linkedin.com/in/stefan-burghelea/",
                  hoverBg: "bg-blue-600/80",
                  hoverBorder: "border-blue-400", 
                  icon: FaLinkedin
                },
                {
                  href: "https://github.com/stefanburghelea",
                  hoverBg: "bg-gray-800/80",
                  hoverBorder: "border-gray-400",
                  icon: FaGithub
                },
                {
                  href: "mailto:stefanburghelea@outlook.com",
                  hoverBg: "bg-red-600/80", 
                  hoverBorder: "border-red-400",
                  icon: FaEnvelope,
                  title: "stefanburghelea@outlook.com"
                },
                {
                  href: "/do/cv06-23.pdf",
                  hoverBg: "bg-purple-600/80", 
                  hoverBorder: "border-purple-400",
                  icon: FaFilePdf,
                  title: "Download CV"
                }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  target="_blank"
                  title={social.title}
                  className="group transition-all duration-300 hover:scale-110"
                >
                  <div className={`bg-white/10 hover:${social.hoverBg} backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center border border-white/20 hover:${social.hoverBorder} transition-all duration-300`}>
                    <social.icon className="w-6 h-6 text-white group-hover:text-white" />
                  </div>
                </a>
              ))}
            </div>
            
            {!isChatExpanded && (
              <div className="pt-8">
                <button
                  onClick={toggleChat}
                  className="group relative overflow-hidden bg-green-500 hover:bg-green-600 text-white font-orbitron font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <span className="relative z-10">Ask Me</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>

          <AiAgent isChatExpanded={isChatExpanded} toggleChat={toggleChat} />
        </div>

        <SwiperComponent 
          slides={projectSlides}
          variant="right"
        />

      </div>
    </div>
  );
};

export default Hero; 