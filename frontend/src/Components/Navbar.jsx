import React from 'react'
import logo from '../assets/logocr.jpg'
const Navbar = () => {
  return (
    <div>
        <header className='flex justify-evenly items-center w-[100vw] h-[18vh] bg-black'>
            <div className='h-[100%] overflow-hidden w-[10%] flex items-center'>
                <img src={logo} className='h-[90%]'/>
            </div>
            <div className='flex flex-col'>
                <h1 className='font-bold text-2xl text-white'>Advocates Self Care Team - Uttar Pradesh</h1>
                <p className='text-[#F4CE14] mt-[5px]'>आज का सहयोग कल का सहारा</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-bold text-2xl text-white'>HelpLine No.- 7007357961 एवं 7007074437</p>
              <p className='text-[#F4CE14] mt-[5px] '>पंजीकरण संख्या :- BAS/05985/2023-24</p>
            </div>
        </header>
    </div>
  )
}

export default Navbar