import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import SahyogCard from './SahyogCard';
import Sidebar from './Sidebar';

const AllSahyog = () => {
  const [sahyogs, setSahyogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSahyogs = async () => {
    setLoading(true);
    try {
      const response = await toast.promise(
        axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/allSahyog`, {
          withCredentials: true,
        }),
        {
          loading: 'Fetching All Sahyogs',
          success: <b>Fetched all the details successfully</b>,
          error: <b>Could not fetch data. Please try again</b>,
        }
      );

      setSahyogs(response.data.sahyogs || []);
    } catch (error) {
      toast.error("Error fetching sahyogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSahyogs();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen">
      <Sidebar />
      <div className="mt-5 flex-1">
        {loading ? (
          <div className="bg-white h-[50vh] rounded-3xl mx-auto py-12 text-purple-600 text-3xl font-bold text-center md:w-[700px] w-[95%]">
            Loading Sahyogs...
          </div>
        ) : sahyogs.length === 0 ? (
          <div className="bg-white h-[50vh] rounded-3xl mx-auto py-12 text-red-600 text-3xl font-bold text-center md:w-[700px] w-[95%]">
            No Sahyogs to Display
          </div>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-3">
            {sahyogs.map((sahyog) => (
              <SahyogCard key={sahyog.id || sahyog._id} sahyog={sahyog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSahyog;
