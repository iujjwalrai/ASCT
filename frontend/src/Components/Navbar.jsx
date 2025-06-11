import React, { useState, useEffect } from 'react';
import logo from '../assets/images/Logo_Transparent_BG.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Any small scroll triggers blur
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md shadow-lg mt-2 mx-2 rounded-3xl'
          : 'bg-black'
      }`}
    >
      <header className={`flex flex-col md:flex-row justify-evenly items-center w-full p-2 md:p-0 h-auto md:h-[18vh]`}>
        {/* Logo */}
        <div className="h-[60px] sm:h-[70px] md:h-[100%] overflow-hidden w-[40%] md:w-[10%] flex justify-center md:items-center">
          <img src={logo} className="h-full object-contain" alt="Logo" />
        </div>

        {/* Center Text */}
        <div className={`flex flex-col items-center text-center md:text-left md:items-start mt-2 md:mt-0 ${
          scrolled ? 'hidden md:flex' : 'flex'
        }`}>
          <h1 className="font-bold text-lg md:text-2xl text-white">
            Advocates Self Care Team - Uttar Pradesh
          </h1>
          <p className="text-[#32a1e6] mt-2 text-sm md:text-base">
            आपका सहयोग अपनों का सहारा
          </p>
        </div>

        {/* Right Info */}
        <div className={`flex flex-col items-center text-center md:text-right md:items-end mt-2 md:mt-0 ${
          scrolled ? 'hidden md:flex' : 'flex'
        }`}>
          <p className="font-bold text-lg md:text-2xl text-white">
            HelpLine No.- 7007357961 एवं 7007074437
          </p>
          <p className="text-[#32a1e6] mt-2 text-sm md:text-base">
            पंजीकरण संख्या :- BAS/05985/2023-24
          </p>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
