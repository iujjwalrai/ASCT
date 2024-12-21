import React from 'react'
import logo from '../assets/images/Logo_Transparent_BG.png'
const Card = ({head, desc}) => {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-indigo-900 to-black p-8 hover:shadow-2xl hover:shadow-blue-800 hover:scale-105 transition duration-300 ease-in-out md:h-[60vh] md:w-[40vw] rounded-3xl text-white h-[60vh] w-[70vw]'>

        <div className='flex justify-center'><img src={logo} className='w-[130px] '></img></div> 
        <h1 className='text-center font-bold text-2xl mt-4'>{head}</h1>
        <p className='text-center mt-8 text-lg'>{desc}</p>
    </div>
  )
}

export default Card