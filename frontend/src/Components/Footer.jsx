import React from 'react';
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-black text-white py-8 px-6 sm:px-8 md:px-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-20 px-4'>
        <div>
          <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-5'>Quick Links</h2>
          <ul className='list-disc space-y-2 sm:space-y-4'>
            <li><Link to='/privacy'>PRIVACY POLICY</Link></li>
            <li><Link to='/sahyogVivran'>SAHYOG VIBRAN</Link></li>
            <li><Link to='/about'>ABOUT US</Link></li>
            <li><Link to='/register'>REGISTER</Link></li>
          </ul>
        </div>
        <div>
          <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-5'>Quick Links</h2>
          <ul className='list-disc space-y-2 sm:space-y-4'>
            <li><Link to='/gallery'>GALLERY</Link></li>
            <li><Link to='/blog'>BLOG</Link></li>
            <li><Link to='/adminLogin'>ADMIN LOGIN</Link></li>
            <li><Link to='/advocatesList'>ADVOCATES LIST</Link></li>
          </ul>
        </div>
        <div>
          <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-5'>CONTACT US</h2>
          <ul className='list-none'>
            <li className='flex items-center'>
              <CiMail className='text-xl sm:text-2xl mr-2' /> 
              advocatesselfcareteam@gmail.com
            </li>
            <li className='flex items-center mt-4'>
              <FaPhoneAlt className='text-xl sm:text-2xl mr-2' />
              7007357961 एवं 7007074437
            </li>
          </ul>
        </div>
      </div>
      <div className='w-full md:w-[70vw] h-[2px] bg-blue-500 mx-auto rounded-full mt-8'></div>
      <div className='text-center mt-4 text-sm sm:text-base'>
        Copyright &copy; 2024 Advocates Self Care Team | All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
