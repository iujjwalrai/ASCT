import React from 'react';
import logo from '../assets/images/Logo_Transparent_BG.png';

const Navbar = () => {
  return (
    <div>
      <header className="flex flex-col md:flex-row justify-evenly items-center w-full h-auto md:h-[18vh] bg-black p-4 md:p-0">
        <div className="h-[80px] md:h-[100%] overflow-hidden w-[40%] md:w-[10%] flex justify-center md:items-center">
          <img src={logo} className="h-full object-contain" alt="Logo" />
        </div>
        <div className="flex flex-col items-center text-center md:text-left md:items-start mt-4 md:mt-0">
          <h1 className="font-bold text-lg md:text-2xl text-white">
            Advocates Self Care Team - Uttar Pradesh
          </h1>
          <p className="text-[#32a1e6] mt-2 text-sm md:text-base">
            आज का सहयोग कल का सहारा
          </p>
        </div>
        <div className="flex flex-col items-center text-center md:text-right md:items-end mt-4 md:mt-0">
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
