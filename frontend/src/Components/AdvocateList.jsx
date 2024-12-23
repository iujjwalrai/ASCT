import React from 'react';

const AdvocateList = ({ user }) => {
  const { name, RegNo, COPNo, Jila, createdAt, AdPractice, Gender } = user;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-0 gap-y-2 sm:gap-y-0">
      <div className="bg-blue-100 py-2 px-3 rounded-lg font-semibold text-center sm:w-[20%] w-full">{name}</div>
      <div className="bg-blue-100 py-2 px-2 rounded-lg text-center sm:w-[7%] w-full">{RegNo}</div>
      <div className="bg-blue-100 py-2 px-3 rounded-lg text-center sm:w-[7%] w-full">{COPNo}</div>
      <div className="bg-blue-100 py-2 px-3 rounded-lg text-center sm:w-[15%] w-full">{Jila}</div>
      <div className="bg-blue-100 py-2 px-3 rounded-lg text-center sm:w-[15%] w-full">{AdPractice}</div>
      <div className="bg-blue-100 py-2 px-3 rounded-lg text-center sm:w-[7%] w-full">{Gender}</div>
      <div className="bg-blue-100 py-2 px-2 rounded-lg text-center sm:w-[25%] w-full">{createdAt}</div>
    </div>
  );
};

export default AdvocateList;
