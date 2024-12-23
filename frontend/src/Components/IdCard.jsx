import React from 'react'
import Sidebar from './Sidebar'

const IdCard = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen md:items-start">
      <Sidebar/>
      <div className="mt-16 w-full md:w-[70vw] max-w-[95vw] bg-blue-100 shadow-2xl shadow-black rounded-3xl px-16 py-8 mx-auto">
        <h1 className='text-2xl font-bold text-red-600'>ASCT - ID CARD Coming Soon !!! </h1>
        <h2 className='mt-8 text-2xl text-blue-600 font-bold'>Kindly keep on engaging in this beautiful work. Your small donations will make a huge impact for various families</h2>
        <h2 className='text-2xl text-blue-600 font-bold'>ASCT - Advocates Self Care Team UP appreciate your kind gestures</h2>
        <h2 className='mt-8 font-bold text-2xl'>Thanks & Regards</h2>
        <h2 className='font-bold text-2xl'>ASCT - UP</h2>
      </div>
    </div>
  )
}

export default IdCard