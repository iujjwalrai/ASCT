import React from 'react'

const Founders = ({name, desg, img}) => {
  return (
      <div className='md:flex px-4 md:flex-col md:items-center flex flex-col items-center'>
          <img src={img} className='h-[220px] w-[220px] rounded-3xl border-[4px] border-black hover:scale-110 duration-300 hover:shadow-2xl hover:shadow-yellow-700'></img>
          <h1 className='font-bold text-xl pt-4 text-white text-center'>Ad. {name}</h1>
          <p className='text-white text-center font-medium mb-6'>{desg}</p>
      </div>
  )
}

export default Founders