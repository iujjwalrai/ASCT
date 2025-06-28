import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import VyawasthaCard from "./VyawasthaCard";
import toast from "react-hot-toast";

const AllVyawastha = () => {
  const [vyawasthas, setVyawasthas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVyawasthas = async () => {
    setLoading(true);
    try {
      const response = await toast.promise(
        axios.get(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/allVyawastha`,
          {
            withCredentials: true,
          }
        ),
        {
          loading: "Fetching All Vyawasthas...",
          success: <b>Fetched all details successfully!</b>,
          error: <b>Could not fetch data. Please try again.</b>,
        }
      );

      setVyawasthas(response.data.vyawasthas || []);
    } catch (error) {
      console.error("Error fetching Vyawasthas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVyawasthas();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
          {/* Content Section */}
          {loading ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12 text-center">
              <div className="flex flex-col items-center justify-center space-y-6">
                {/* Modern Loading Spinner */}
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Loading Vyawasthas
                  </h2>
                  <p className="text-gray-600">
                    Please wait while we fetch the latest data...
                  </p>
                </div>

                {/* Loading Animation Bars */}
                <div className="flex space-x-2">
                  <div className="w-2 h-8 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-8 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-8 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-8 bg-blue-400 rounded-full animate-pulse delay-225"></div>
                </div>
              </div>
            </div>
          ) : vyawasthas.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12 text-center">
              <div className="flex flex-col items-center justify-center space-y-6">
                {/* Empty State Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    No Vyawastha Available
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    There are currently no Vyawastha documents to display.
                    Please check back later or contact support.
                  </p>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={fetchVyawasthas}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Count */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">
                      Found{" "}
                      <span className="font-bold text-blue-600">
                        {vyawasthas.length}
                      </span>{" "}
                      Vyawastha{vyawasthas.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <button
                    onClick={fetchVyawasthas}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-lg hover:bg-blue-50"
                    title="Refresh Data"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Vyawastha Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 p-6">
                {vyawasthas.map((vyawastha, index) => (
                  <div
                    key={vyawastha._id}
                    className="animate-fade-in-up opacity-0"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <VyawasthaCard vyawastha={vyawastha} />
                  </div>
                ))}
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

              {/* Load More Indicator (if needed in future) */}
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm">All Vyawasthas loaded</span>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVyawastha;
