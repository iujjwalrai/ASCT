import React, { useState } from 'react';
import logo from "../assets/images/Logo_Transparent_BG.png";
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
import { removeUser } from "../redux/slices/userSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMenu } from 'react-icons/fi';
import axios from 'axios';
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for hamburger toggle

  const LogoutHandler = async () => {
    try {
      dispatch(logout());
      dispatch(removeUser());
      await axios.post(
        `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/logout`,
        null,
        { withCredentials: true }
      );
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      dispatch(logout());
      dispatch(removeUser());
      navigate("/");
      toast.success("Logged Out Successfully");
      console.error("Error during logout:", error);
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger menu for small screens */}
      <div className="md:hidden flex justify-between items-center bg-gradient-to-t from-blue-900 to-purple-800 px-6 py-4 text-white">
        <img src={logo} alt="Logo" className="w-[50px]" />
        <FiMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Sidebar / Navbar */}
      <div
        className={`md:flex flex-col md:w-[20%] bg-gradient-to-t from-blue-900 to-purple-800 text-white h-full py-4 rounded-3xl md:mx-3 my-12 md:h-full absolute md:static transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-40`}
      >
        <div className="flex justify-center py-6">
          <img src={logo} className="w-[100px]" alt="Logo" />
        </div>
        <div className="flex flex-col gap-8 px-6">
          <Link to="/advocates/dashboard" className="flex gap-4 items-center">
            <MdOutlineDashboard className="text-3xl" />
            Dashboard
          </Link>
          <Link to="/advocates/dashboard/profile" className="flex gap-4 items-center">
            <CgProfile className="text-3xl" />
            Profile
          </Link>
          <Link to="/advocates/dashboard/idcard" className="flex gap-4 items-center">
            <IoIdCard className="text-3xl" />
            Id Card
          </Link>
          <Link to="/advocates/dashboard/runningSahyog" className="flex gap-4 items-center">
            <FaEye className="text-3xl" />
            Running Sahyog List
          </Link>
          <Link to="/advocates/dashboard/allSahyog" className="flex gap-4 items-center">
            <CiSearch className="text-3xl" />
            View All Sahyog List
          </Link>
          <Link to="/advocates/dashboard/allVyawastha" className="flex gap-4 items-center">
            <CiSearch className="text-3xl" />
            View All Vwayastha Shulk
          </Link>
          <Link to="/advocates/dashboard/updatePass" className="flex gap-4 items-center">
            <FaLock className="text-3xl" />
            Update Password
          </Link>
          <Link to="/advocates/dashboard/selfDeclaration" className="flex gap-4 items-center">
            <TfiWrite className="text-3xl" />
            Self Declaration
          </Link>
        </div>
        <div
          className="w-[90%] mx-auto mt-10 bg-gradient-to-tl from-blue-300 via-purple-300 to-white py-4 px-6 rounded-2xl flex gap-4 items-center text-black text-xl font-bold cursor-pointer"
          onClick={LogoutHandler}
        >
          <IoLogOut className="text-3xl" />
          Logout
        </div>
      </div>
    </>
  );
};

export default Sidebar;
