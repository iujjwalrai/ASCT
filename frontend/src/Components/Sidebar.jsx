import React from 'react'
import logo from "../assets/images/Logo_Transparent_BG.png"
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIdCard } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import {removeUser} from "../redux/slices/userSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogoutHandler = async()=>{
        dispatch(logout());
        dispatch(removeUser());
        navigate("/");
        toast.success("Logged Out Successfully");
    }

  return (
    <div className='flex flex-col h-[100%] w-[20%] bg-gradient-to-t from-blue-900 to-purple-800 px-6 py-10 mx-4 my-5 rounded-3xl text-white shadow-2xl shadow-black'>
        <div className='flex justify-center'>
            <img src={logo} className='w-[100px]'/>
        </div>
        <div className='flex flex-col mt-18 gap-8 mt-10'>
            <Link to = '/advocates/dashboard'>
                <div className='flex gap-7'>
                    <MdOutlineDashboard className='text-white text-3xl'/>
                    Dashboard
                </div>
            </Link>
            <Link to = 'profile'>
                <div className='flex gap-7'>
                    <CgProfile className='text-white text-3xl'/>
                    Profile
                </div>
            </Link>
            <Link to= 'idcard'>
                <div className='flex gap-7'>
                    <IoIdCard className='text-white text-3xl'/>
                    Id Card
                </div>
            </Link>
            <div className='flex gap-7'>
                <FaEye className='text-white text-3xl'/>
                Running Sahyog List
            </div>
            <div className='flex gap-7'>
                <CiSearch className='text-white text-3xl'/>
                View All Sahyog List
            </div>
            <div className='flex gap-7'>
                <CiSearch className='text-white text-3xl'/>
                View All Vwayastha Shulk
            </div>
            <div className='flex gap-7'>
                <FaLock className='text-white text-3xl'/>
                Update Pasword
            </div>
            <div className='flex gap-7'>
                <TfiWrite className='text-white text-3xl'/>
                Self Declaration
            </div>
        </div>
        <div className='w-[90%] h-[15vh] bg-gradient-to-tl from-blue-300 via-purple-300 to-white mt-12 rounded-2xl flex px-8 gap-7 items-center text-black text-xl font-bold cursor-pointer' onClick={LogoutHandler}>
            <IoLogOut className='text-black text-3xl'/>
            Logout
        </div>
    </div>
  )
}

export default Sidebar