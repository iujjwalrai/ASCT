import React from 'react'
import logo from '../assets/images/Logo_Transparent_BG.png'

const Card = ({ head, desc }) => {
  return (
    <div className="relative w-full max-w-xl flex flex-col items-center mt-20">
      {/* Hanging thread */}
      <div className="absolute top-[-70px] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        {/* Longer Thread */}
        <div className="w-[3px] h-16 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 shadow-md rounded"></div>
        {/* Bigger Pin/Ring */}
        <div className="w-6 h-6 rounded-full border-[4px] border-gray-400 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] shadow-inner mt-[-2px]"></div>
      </div>

      {/* Card body */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white rounded-3xl shadow-2xl p-10 pt-12 transition-transform duration-300 transform hover:scale-105 hover:-rotate-1 hover:shadow-blue-400/50 min-h-[420px] w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24 object-contain drop-shadow-xl" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-4">{head}</h2>
        <p className="text-center text-lg leading-relaxed font-light px-2">{desc}</p>
      </div>
    </div>
  )
}

export default Card
