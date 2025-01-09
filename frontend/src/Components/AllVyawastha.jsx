import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import VyawasthaCard from './VyawasthaCard';
import toast from 'react-hot-toast';

const AllVyawastha = () => {
  const [vyawasthas, setVyawasthas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVyawasthas = async () => {
    setLoading(true);
    try {
      const response = await toast.promise(
        axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/allVyawastha`, {
          withCredentials: true,
        }),
        {
          loading: 'Fetching All Vyawasthas...',
          success: <b>Fetched all details successfully!</b>,
          error: <b>Could not fetch data. Please try again.</b>,
        }
      );

      setVyawasthas(response.data.vyawasthas || []);
    } catch (error) {
      console.error('Error fetching Vyawasthas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVyawasthas();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white min-h-screen relative">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        {loading ? (
          <div className="bg-white shadow-md rounded-lg py-10 px-6 text-center text-purple-700 font-bold text-2xl">
            Loading Vyawasthas...
          </div>
        ) : vyawasthas.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg py-10 px-6 text-center text-red-600 font-bold text-2xl">
            No Vyawastha to Display
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {vyawasthas.map((vyawastha) => (
              <VyawasthaCard key={vyawastha._id} vyawastha={vyawastha} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVyawastha;
