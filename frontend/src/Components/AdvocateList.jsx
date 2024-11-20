import React from 'react'

const AdvocateList = ({user}) => {
  const {name, RegNo, COPNo, Jila, createdAt, AdPractice, Gender} = user;
  return (
    <div className='flex justify-between'>
      <div className='bg-blue-100 py-2 px-3 rounded-lg font-semibold text-center w-[20%]'>{name}</div>
      <div className='bg-blue-100 py-2 px-2 rounded-lg text-center w-[7%]'>{RegNo}</div>
      <div className='bg-blue-100 py-2 px-3 rounded-lg text-center w-[7%]'>{COPNo}</div>
      <div className='bg-blue-100 py-2 px-3 rounded-lg text-center w-[15%]'>{Jila}</div>
      <div className='bg-blue-100 py-2 px-3 rounded-lg text-center w-[15%]'>{AdPractice}</div>
      <div className='bg-blue-100 py-2 px-3 rounded-lg text-center w-[7%]'>{Gender}</div>
      <div className='bg-blue-100 py-2 px-2 rounded-lg text-center w-[25%]'>{createdAt}</div>
    </div>
  )
}

export default AdvocateList