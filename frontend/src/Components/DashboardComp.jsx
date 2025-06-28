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
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-blue-50 gap-6 relative min-h-screen">
      <Sidebar />
      
      <div className="mt-16 w-full md:w-[70vw] max-w-[95vw] mx-auto px-4 md:px-8 py-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="md:order-1 order-2">
              <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-2">Dashboard</h1>
              <p className="text-gray-500 text-sm md:text-base">{formattedDate}</p>
            </div>
            <div className="md:order-2 order-1 flex justify-center md:justify-end">
              <img src={logo} className="w-[80px] md:w-[100px] h-auto opacity-90" alt="Logo" />
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-2">
            Welcome {user.name}
          </h2>
        </div>

        {/* Important Messages */}
        <div className="space-y-6">
          
          <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-6">
            <p className="text-red-700 text-lg md:text-xl font-medium leading-relaxed">
              Submitting Self declaration is very important. If not done by you, please do it now.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-6">
            <p className="text-red-700 text-lg md:text-xl font-medium leading-relaxed">
              Please do not skip any donation. Your donation is very important to families.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardComp;