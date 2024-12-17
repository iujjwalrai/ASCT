import React from 'react'
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='bg-black text-white py-8 px-16'>
        <div className='grid grid-cols-3 px-4 gap-x-20'>
            <div>
                <h2 className='text-2xl font-bold mb-5'>Quick Links</h2>
                <ul className='list-disc space-y-4'>
                    <li><Link to='/privacy'>PRIVACY POLICY</Link></li>
                    <li><Link to='/sahyogVivran'>SAHYOG VIBRAN</Link></li>
                    <li><Link to='/about'>ABOUT US</Link></li>
                    <li><Link to='/register'>REGISTER</Link></li>
                </ul>
            </div>
            <div>
            <h2 className='text-2xl font-bold mb-5'>Quick Links</h2>
                <ul className='list-disc space-y-4'>
                    <li><Link to='/gallery'>GALLERY</Link></li>
                    <li><Link to='/blog'>BLOG</Link></li>
                    <li><Link to='/adminLogin'>ADMIN LOGIN</Link></li>
                    <li><Link to='/advocatesList'>ADVOCATES LIST</Link></li>
                </ul>
            </div>
            <div>
            <h2 className='text-2xl font-bold mb-5'>CONTACT US</h2>
                <ul className='list-none'>
                    <li> <CiMail className='text-2xl mb-1'></CiMail>advocatesselfcareteam@gmail.com</li>
                    <li><FaPhoneAlt className='text-2xl mb-1 mt-4'></FaPhoneAlt>7007357961 एवं 7007074437</li>
                </ul>
            </div>
        </div>
        <div className='w-[70vw] h-[2px] bg-blue-500 mx-auto rounded-full mt-10'></div>
        <div className='text-center mt-6'>Copyright &copy; 2024 Advocates Self Care Team | All Rights Reserved</div>
    </div>
  )
}

export default Footer