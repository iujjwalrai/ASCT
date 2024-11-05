import React from 'react'

const Founders = ({name, desg, img}) => {
  return (
    <div>
        <div>
            <img src={img} className='h-[260px] w-[260px] rounded-3xl border-[4px] border-black hover:scale-110 duration-300 hover:shadow-2xl hover:shadow-yellow-700'></img>
            <h1 className='font-bold text-xl pt-2 text-white text-center'>{name}</h1>
            <p className='text-white text-center font-medium'>{desg}</p>
        </div>
    </div>
  )
}

export default Founders