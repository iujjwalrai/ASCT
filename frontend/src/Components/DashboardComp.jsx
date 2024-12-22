import React from 'react';
import Sidebar from './Sidebar';
import logo from "../assets/images/Logo_Transparent_BG.png";
import { useSelector } from 'react-redux';

const DashboardComp = () => {
  const user = useSelector((state) => state.user.userDetails);
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen">
      <Sidebar />
      <div className="mt-16 w-full md:w-[70vw] max-w-[90vw] bg-blue-100 h-[70vh] shadow-2xl shadow-black rounded-3xl px-16 py-8 mx-auto">
        <div className="flex md:flex-row flex-col md:justify-between gap-8">
          <div className='md:order-1 order-2'>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p>{formattedDate}</p>
          </div>
          <img src={logo} className="w-[110px] md:order-2 order-1" alt="Logo" />
        </div>
        <div className="mt-12">
          <p className="text-2xl font-semibold">Welcome {user.name} !!</p>
          <p className="text-red-600 text-2xl mt-6">
            Submitting Self declaration is very important. If not done by you, please do it now.
          </p>
          <p className="text-red-600 text-2xl mt-6">
            Please do not skip any donation. Your donation is very important to families.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
