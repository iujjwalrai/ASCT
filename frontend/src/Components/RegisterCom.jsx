import React from 'react'
import backgroundImage from '../assets/images/logniImage2.jpg';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { upDistrictsAndTehsils } from '../assets/upDistrictsAndTeshils'
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

const districts = Object.keys(upDistrictsAndTehsils);
const RegisterCom = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [teshsils, setTehsils] = useState([])

  const handleDistrictChange = (event) => {
    const dis = event.target.value;
    setSelectedDistrict(dis);
    setTehsils(dis ? upDistrictsAndTehsils[dis] : [])
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
    toast.error("Password and Confirm Password do not match!");
    return;
  }
    const { confirmPassword, ...formDataWithoutConfirm } = data;
    const formData = { ...formDataWithoutConfirm, Jila: selectedDistrict };

    try {
      const responseFromServer = await toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/registerPortal/register`, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        },
      }), {
        loading: "Registering on ASCT - UP",
        success: <b>Successfully Registered on ASCT - UP</b>,
        error: <b>Could Not register on ASCT - Up</b>
      });
      reset();
      setSelectedDistrict("")
      navigate("/login");
      toast.success('You are successfully registered on ASCT. Kindly login with your credentials', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });

    }
    catch (er) {
      toast.error(er.response.data.message);
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto"
      >
        {/* Main Container */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
            <div className="relative px-8 py-12 text-center">
              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mb-4"
              >
                ASCT - UP Registration
              </motion.h1>
              <motion.p 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-300 text-lg font-medium"
              >
                आज का सहयोग कल का सहारा
              </motion.p>
              <div className="mt-6 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
              
              {/* Personal Information Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      {...register("name")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Mobile Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      {...register("mobile")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      {...register("email")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Date of Birth <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      {...register("DOB")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Gender <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      {...register("Gender")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    >
                      <option className="bg-gray-800 text-white" value="">Choose Gender</option>
                      <option className="bg-gray-800 text-white" value="Male">Male</option>
                      <option className="bg-gray-800 text-white" value="Female">Female</option>
                      <option className="bg-gray-800 text-white" value="Other">Other</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Blood Group
                    </label>
                    <select
                      {...register("BloodGroup")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                    >
                      <option className="bg-gray-800 text-white" value="">Choose Blood Group</option>
                      <option className="bg-gray-800 text-white" value="A+">A+</option>
                      <option className="bg-gray-800 text-white" value="A-">A-</option>
                      <option className="bg-gray-800 text-white" value="B+">B+</option>
                      <option className="bg-gray-800 text-white" value="B-">B-</option>
                      <option className="bg-gray-800 text-white" value="O+">O+</option>
                      <option className="bg-gray-800 text-white" value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Security Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Security Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      {...register("password")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Create a strong password"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      {...register("confirmPassword")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Professional Information Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Registration No. <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      {...register("RegNo")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                      placeholder="Registration number"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Registration Year <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      {...register("RegNoYear")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                      placeholder="Registration year"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      COP Number
                    </label>
                    <input
                      type="text"
                      {...register("COPNo")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                      placeholder="COP number"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      COP Year
                    </label>
                    <input
                      type="text"
                      {...register("COPNoYear")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                      placeholder="COP year"
                    />
                  </div>
                  <div className="group md:col-span-2">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Practice Level <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      {...register("AdPractice")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-green-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                    >
                      <option className="bg-gray-800 text-white" value="">Choose Practice Level</option>
                      <option className="bg-gray-800 text-white" value="Uchh Nyayalay">Uchh Nyayalay</option>
                      <option className="bg-gray-800 text-white" value="Jila Nyayalay">Jila Nyayalay</option>
                      <option className="bg-gray-800 text-white" value="Tehsil Nyayalay">Tehsil Nyayalay</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Location Information Section */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-white/5 rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  Location Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      District <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      onChange={handleDistrictChange}
                      value={selectedDistrict}
                      name="Jila"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                    >
                      <option className="bg-gray-800 text-white" value="">Choose District</option>
                      {districts.map((district) => (
                        <option key={district} className="bg-gray-800 text-white" value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Tehsil <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      {...register("Tehsil")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                    >
                      <option className="bg-gray-800 text-white">Choose Tehsil</option>
                      {teshsils.map((tehsil) => (
                        <option key={tehsil} className="bg-gray-800 text-white">
                          {tehsil}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Home District <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      {...register("HomeDistrict")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-orange-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                    >
                      <option className="bg-gray-800 text-white" value="">Choose Home District</option>
                      {districts.map((district) => (
                        <option key={district} className="bg-gray-800 text-white" value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Home Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    {...register("HomeAddress")}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
                    placeholder="Enter your complete home address"
                  />
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                >
                  Already have an account? Login
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RegisterCom