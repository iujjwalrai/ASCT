import React, { useState } from "react";
import logo from "../assets/images/Logo_Transparent_BG.png";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIdCard } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { IoLogOut } from "react-icons/io5";
import { SiHelpdesk } from "react-icons/si";
import { MdOutlineQueryStats } from "react-icons/md";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { removeUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import axios from "axios";

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
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Modern Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-white/90 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 text-gray-800 sticky top-0 z-10 shadow-sm">
        <img src={logo} alt="Logo" className="w-[45px] h-auto" />
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-10 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Modern Sidebar */}
      <div
        className={`md:flex flex-col md:w-[280px] lg:w-[300px] bg-white/95 backdrop-blur-xl text-gray-800 h-full md:py-6 border-r border-gray-200/50 fixed top-0 left-0 bottom-0 
        ${isOpen ? "translate-x-1" : "-translate-x-full"} 
        md:translate-x-1
        z-50 md:z-30 
        md:static transition-all duration-300 ease-out shadow-xl md:shadow-none rounded-xl`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-between items-center px-6 py-4 border-b border-gray-200/50">
          <img src={logo} className="w-[60px] h-auto" alt="Logo" />
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex justify-center py-6 px-6">
          <img
            src={logo}
            className="w-[80px] h-auto drop-shadow-sm"
            alt="Logo"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 px-4 flex-1 overflow-y-auto">
          <Link
            to="/advocates/dashboard"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <MdOutlineDashboard className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Dashboard</span>
          </Link>

          <Link
            to="/advocates/dashboard/helpDesk"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <SiHelpdesk className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">HelpDesk</span>
          </Link>

          <Link
            to="/advocates/dashboard/profile"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-green-50 hover:text-green-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <CgProfile className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Profile</span>
          </Link>

          <Link
            to="/advocates/dashboard/idcard"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <IoIdCard className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">ID Card</span>
          </Link>

          <Link
            to="/advocates/dashboard/query"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <MdOutlineQueryStats className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Your Queries</span>
          </Link>

          <Link
            to="/advocates/dashboard/runningSahyog"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-cyan-50 hover:text-cyan-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <FaEye className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Running Sahyog List</span>
          </Link>

          <Link
            to="/advocates/dashboard/allSahyog"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-teal-50 hover:text-teal-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <CiSearch className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">View All Sahyog List</span>
          </Link>

          <Link
            to="/advocates/dashboard/allVyawastha"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-rose-50 hover:text-rose-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <CiSearch className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">View All Vwayastha Shulk</span>
          </Link>

          <Link
            to="/advocates/dashboard/updatePass"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-orange-50 hover:text-orange-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <FaLock className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Update Password</span>
          </Link>

          <Link
            to="/advocates/dashboard/selfDeclaration"
            className="flex gap-4 items-center px-4 py-3.5 rounded-xl hover:bg-violet-50 hover:text-violet-700 transition-all duration-200 group font-medium"
            onClick={() => setIsOpen(false)}
          >
            <TfiWrite className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Self Declaration</span>
          </Link>
        </nav>

        {/* Modern Logout Button */}
        <div className="px-4 py-4 border-t border-gray-200/50 mt-auto">
          <button
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3.5 px-6 rounded-xl flex gap-3 items-center justify-center font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={LogoutHandler}
          >
            <IoLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
