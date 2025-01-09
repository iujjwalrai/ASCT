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
      <div className="flex bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-2">
        <Sidebar />
        <div className="mt-5 flex-1 flex items-center justify-center">
          <div className="bg-white shadow-lg h-[50vh] rounded-3xl mx-auto py-12 text-red-600 text-3xl font-bold text-center w-[90%] max-w-lg">
            No Sahyogs to Display
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen">
      <Sidebar />
      <div className="mt-5 flex-1">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 px-4">
          {sahyogs.map((sahyog) => (
            <SahyogCard sahyog={sahyog} key={sahyog._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunningSahyogList;
