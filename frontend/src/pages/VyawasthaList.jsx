import React, { useState, useEffect } from 'react';
import AnimatedLoadingSkeleton from '../Components/ui/animated-loading-skeleton';
import axios from 'axios';
import toast from 'react-hot-toast';
import Footer from '../Components/Footer';

const VyawasthaList = () => {
  const [vyawasthas, setVyawasthas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVyawasthas = async () => {
    try {
      const response = await toast.promise(
        axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/advocatesList/getVyawasthaList`, { withCredentials: true }),
        {
          loading: "Fetching Vyawasthas...",
          success: <b>Vyawasthas fetched successfully!</b>,
          error: <b>Failed to fetch Vyawasthas</b>,
        }
      );

      setVyawasthas(response.data.vyawasthas);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVyawasthas();
  }, []);

  return (
    <div>
      {loading ? (<AnimatedLoadingSkeleton/>) : (
      <div className="w-[90vw] mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Recent Vyawasthas</h1>
          <div className="min-h-[70vh] shadow-2xl rounded-2xl w-full border-t-[4vh] border-blue-950">
            {/* Table Headers */}
            <div className="flex justify-between px-8 py-4 bg-blue-100 rounded-t-2xl hidden md:flex">
              <div className="font-bold text-center w-[20%]">Vyawastha Name</div>
              <div className="font-bold text-center w-[20%]">Date Created</div>
              <div className="font-bold text-center w-[20%]">Status</div>
            </div>
            {/* Table Rows */}
            <div className="px-8 py-6">
              {vyawasthas.length > 0 ? (
                vyawasthas.map((vyawastha, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white shadow-md p-4 rounded-xl hover:bg-blue-50"
                  >
                    <div className="text-center md:w-[20%] text-blue-900 font-medium">
                      <span className="block md:hidden font-bold">Vyawastha Name:</span>
                      {vyawastha.name || 'N/A'}
                    </div>
                    <div className="text-center md:w-[20%] text-blue-700">
                      <span className="block md:hidden font-bold">Date Created:</span>
                      {new Date(vyawastha.createdAt).toLocaleDateString() || 'N/A'}
                    </div>
                    <div className="text-center md:w-[20%]">
                      <span className="block md:hidden font-bold">Status:</span>
                      {vyawastha.isCompleted ? (
                        <span className="text-green-700 font-semibold bg-green-100 px-2 py-1 rounded-lg">
                          Completed
                        </span>
                      ) : (
                        <span className="text-red-700 font-semibold bg-red-100 px-2 py-1 rounded-lg">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-blue-900 font-semibold">No Vyawasthas found.</div>
              )}
            </div>
          </div>
      </div>)}
      <Footer />
    </div>
  );
};

export default VyawasthaList;
