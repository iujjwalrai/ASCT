import React from 'react';

const Founders = ({ name, desg, img }) => {
  return (
    <div className="bg-[#111827] rounded-xl shadow-md hover:shadow-yellow-600 transition-transform transform hover:scale-[1.03] duration-300 w-[220px] text-center">
      <img
        src={img}
        alt={name}
        className="h-[220px] w-[220px] object-cover rounded-t-xl mx-auto"
      />
      <div className="p-4">
        <h2 className="text-white font-semibold text-[17px] leading-5">
          Ad. {name}
        </h2>
        <p className="text-gray-400 text-sm mt-1">{desg}</p>
      </div>
    </div>
  );
};

export default Founders;
