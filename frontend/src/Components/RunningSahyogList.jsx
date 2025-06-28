import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import SahyogCard from './SahyogCard';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const RunningSahyogList = () => {
  const [sahyogs, setSahyogs] = useState([]);
  
  const fetchSahyogs = async () => {
    try {
      const responseFromServer = await toast.promise(
        axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/allSahyog`, {
          withCredentials: true,
        }),
        {
          loading: 'Fetching All Sahyogs',
          success: <b>Fetched all the details successfully</b>,
          error: <b>Could not fetch data. Please try again</b>,
        }
      );
      const filteredSahyog = responseFromServer.data.sahyogs.filter(
        (sahyog) => !sahyog.isCompleted
      );
      setSahyogs(filteredSahyog);
    } catch (error) {
      toast.error("Some error occured")
    }
  };

  useEffect(() => {
    fetchSahyogs();
  }, []);

  if (sahyogs.length === 0) {
    return (
      <div className="flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-12 text-center max-w-lg w-full border border-white/20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Active Sahyogs</h2>
            <p className="text-gray-600 text-lg">There are currently no sahyogs available for donation.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h1 className="text-3xl font-bold text-black mb-2">Active Sahyogs</h1>
            <p className="text-blue-800">Support your fellow advocates in their time of need</p>
            <div className="flex items-center mt-4">
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center space-x-2">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-black font-semibold">{sahyogs.length} Active Sahyogs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {sahyogs.map((sahyog, index) => (
            <div
              key={sahyog._id}
              className="animate-fade-in-up opacity-0"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <SahyogCard sahyog={sahyog} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RunningSahyogList;