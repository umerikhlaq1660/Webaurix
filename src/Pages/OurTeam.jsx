import React, { useState, useRef } from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { teamMembers } from "./TeamData";

const getIcon = (type) => {
  switch (type) {
    case "linkedin":
      return <FaLinkedin />;
    case "twitter":
      return <FaTwitter />;
    case "github":
      return <FaGithub />;
    default:
      return null;
  }
};

const OurTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMember = teamMembers[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative w-full bg-black py-24 px-4 sm:px-6 lg:px-12 text-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute w-50 h-50 bg-gradient-to-r from-blue-500 to-green-400 rounded-full blur-3xl opacity-30 top-5 left-10 z-0" />
      <div className="absolute w-80 h-80 bg-gradient-to-br from-teal-400 to-indigo-600 rounded-full blur-2xl opacity-25 bottom-20 right-1 z-0" />
      <div className="absolute w-90 h-80 bg-gradient-to-br from-teal-400 to-indigo-600 rounded-full blur-2xl opacity-25 top-0 right-1 z-0" />

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold">Meet Our Team</h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Meet the talented individuals behind our success.
        </p>
      </div>

      <div className="relative z-10 max-w-8xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
        <div className="w-full sm:mb-40 lg:w-1/2 text-left">
          <h2 className="text-4xl sm:text-7xl font-bold">{activeMember.name}</h2>
          <p className="text-[#7ebad1] text-lg mb-4">{activeMember.role}</p>
          <p className="text-sm sm:text-base text-gray-300 mb-6">
            {activeMember.description}
          </p>
          <div className="flex gap-4">
            {activeMember.socials.map((s, i) => (
              <a
                key={i}
                href={s.link}
                className="text-white hover:text-blue-400 text-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getIcon(s.type)}
              </a>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
          <img
            src={activeMember.img}
            alt={activeMember.name}
            className="w-full h-full max-h-full object-contain filter grayscale"
          />
          <div className="hidden lg:flex flex-col gap-3 absolute top-6 right-6 z-30">
            <button
              onClick={prevSlide}
              className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 border border-white rounded-full flex items-center justify-center text-white hover:bg-white/10 transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 w-full px-4 sm:px-6 lg:px-12 z-20">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl py-1 sm:py-5 lg:py-5 px-6 text-white flex flex-col sm:flex-row justify-between items-center shadow-md">
          <div className="w-full mt-6 overflow-x-auto">
            <div className="flex gap-10 py-1 sm:py-2 sm:gap-8 md:gap-19 sm:px-7 items-center w-max justify-start">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center min-w-[60px] sm:min-w-[80px] md:min-w-[100px]"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className={`rounded-full object-cover transition-all duration-300 
                    w-15 h-15 sm:w-14 sm:h-14 md:w-30 md:h-30 
                    ${idx === activeIndex ? "ring-2 ring-white scale-105" : "opacity-80"}`}
                  />
                  <p className="text-[10px] sm:text-[15px] mt-2 text-center leading-tight">
                    {member.name}
                    <br />
                    <span className="text-[9px] sm:text-[13px] text-gray-300">
                      {member.role}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
