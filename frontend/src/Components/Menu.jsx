import React from 'react'
import { Link } from 'react-router-dom'
const Menu = () => {
  return (
    <div className='border-t-2 border-t-blue-500'>
        <ul className='flex h-[12vh] w-[100vw] bg-black text-white justify-evenly'>
            <Link to="/">
                <li className='h-full font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Home</li>
            </Link>
            <Link to = "/about">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>About Us</li>
            </Link>
            <Link to = "/advocatesList">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Advocates List</li>
            </Link>
            <Link to = "/sahyogList">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Sahyog List</li>
            </Link>
            <Link to = "/vyawasthaList">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Vyawastha List</li>
            </Link>
            <Link to = "/niyamawali">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Niyamawali</li>
            </Link>
            <Link to="/contact">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Contact</li>
            </Link>
            <Link to = "/login">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Login</li>
            </Link>
            <Link to = "/register">
                <li className='h-[100%] font-bold cursor-pointer text-lg hover:border-b-4 hover:border-b-blue-500 flex items-center transition duration-500'>Register</li>
            </Link>
        </ul>
    </div>
  )
}

export default Menu