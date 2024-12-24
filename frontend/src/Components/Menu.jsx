import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from 'react-redux';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="border-t-2 border-t-blue-500">
      {/* Hamburger Icon */}
      <div className="md:hidden flex justify-center p-4 bg-black">
        <GiHamburgerMenu
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-xl cursor-pointer"
        />
      </div>

      {/* Menu List with Transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } md:opacity-100 md:max-h-none`}
      >
        <ul className="flex flex-col md:flex-row bg-black text-white justify-around px-20 items-center md:h-20">
          <Link to="/">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              About Us
            </li>
          </Link>
          <Link to="/advocatesList">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              Advocates List
            </li>
          </Link>
          <Link to="/sahyogList">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              Sahyog List
            </li>
          </Link>
          <Link to="/vyawasthaList">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              Vyawastha List
            </li>
          </Link>
          <Link to="/niyamawali">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              Niyamawali
            </li>
          </Link>
          <Link to="/contact">
            <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
              Contact
            </li>
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
                  Register
                </li>
              </Link>
            </>
          ) : (
            <Link to="/advocates/dashboard">
              <li className="font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center justify-center transition duration-300 py-2 md:py-0">
                Dashboard
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
