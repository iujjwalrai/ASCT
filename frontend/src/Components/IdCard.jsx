import React from 'react'
import Sidebar from './Sidebar'

const IdCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="flex flex-col lg:flex-row gap-6 relative z-10">
        <Sidebar/>
        
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Coming Soon Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 lg:p-12 mb-6 text-center">
              {/* ID Card Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-8 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                </svg>
              </div>

              {/* Main Announcement */}
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-red-600 animate-pulse">
                  ASCT - ID CARD
                </h1>
                <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Coming Soon !!!
                </div>
              </div>

              {/* ID Card Preview */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mb-8 border-2 border-dashed border-blue-300">
                <div className="bg-white rounded-xl p-6 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">ASCT</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-500">Digital ID Card</div>
                      <div className="text-lg font-bold text-gray-700">Preview</div>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 text-sm">
                    Your official ASCT ID will appear here
                  </div>
                </div>
              </div>
            </div>

            {/* Appreciation Message Card */}
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 lg:p-8 mb-6">
              <div className="text-center space-y-6">
                {/* Heart Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl lg:text-2xl text-blue-700 font-bold leading-relaxed">
                    Kindly keep on engaging in this beautiful work. Your small donations will make a huge impact for various families
                  </h2>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h2 className="text-xl lg:text-2xl text-blue-700 font-bold">
                      ASCT - Advocates Self Care Team UP appreciate your kind gestures
                    </h2>
                  </div>
                </div>

                {/* Impact Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                    <div className="text-2xl font-bold text-green-600">🤝</div>
                    <div className="text-sm text-green-700 font-semibold mt-1">Community Support</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">💝</div>
                    <div className="text-sm text-purple-700 font-semibold mt-1">Generous Donations</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">🌟</div>
                    <div className="text-sm text-orange-700 font-semibold mt-1">Making Impact</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thanks & Regards Card */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-6 lg:p-8 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-600 to-slate-700 rounded-full mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                
                <h2 className="text-xl lg:text-2xl font-bold text-gray-700">
                  Thanks & Regards
                </h2>
                
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 inline-block shadow-lg">
                  <h2 className="text-xl lg:text-2xl font-bold">
                    ASCT - UP
                  </h2>
                  <p className="text-sm opacity-90 mt-1">
                    Advocates Self Care Team - Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default IdCard