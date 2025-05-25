import React, { useState } from "react";
import backgroundImage from "../assets/images/logniImage2.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth, logout, scheduleAutoLogout } from "../redux/slices/authSlice";
import logo from "../assets/images/Logo_Transparent_BG.png";
import { IoMdCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";

const LoginComp = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const forgetForm = useForm();
  const verifyOTPForm = useForm();
  const updatePassForm = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEasterEggDoubleClick = () => {
    setIsEasterEggOpen(true);
  };
  const closeEasterEgg = () => {
    setIsEasterEggOpen(false);
  };

  const submitHandler = async (data) => {
    try {
      const responseFromServer = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/login`,
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        ),
        {
          loading: "Logging You In ..... ",
          success: <b>Successfully Logged You In</b>,
          error: <b>Error in logging you in</b>,
        }
      );

      if (responseFromServer.data.success) {
        dispatch(
          setAuth({
            isAuthenticated: true,
            loginTime: Date.now(),
          })
        );
        dispatch(scheduleAutoLogout());
        reset();
        navigate("/advocates/dashboard");
      } else {
        console.log("Token not found");
        toast.error("Login failed. Please try again later");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openPopUp = () => {
    setIsPopUpOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
    document.body.style.overflow = "auto"; // enable scrolling
  };

  const forgetHandler = async (data) => {
    try {
      const vapas = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/sendotp`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          loading: "Sending OTP ....",
          success: <b>OTP sent successfully</b>,
          error: <b>Some error occurred</b>,
        }
      );

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img className="h-10 w-10 rounded-full" src={logo} alt="" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    An OTP is sent to your registered email ID
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    It is valid for 10 minutes only! Please don't share the OTP
                    with anyone
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
        }
      );

      if (vapas.data.success) {
        setOtpSent(true);
        setUpdateDetails(data);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  const verifyOTPHandler = async (data) => {
    data = { ...data, ...updateDetails };
    try {
      const huaKeeNahi = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/verifyOTP`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          loading: "Verifying Your OTP",
          success: <b>OTP verified successfully</b>,
          error: <b>OTP is incorrect</b>,
        }
      );
      if (huaKeeNahi.data.success) {
        setOtpVerified(true);
        setUpdateDetails({ ...data });
      }
    } catch (gal) {
      toast.error(gal.response.data.message);
    }
  };

  const updatePassHandler = async (data) => {
    data = { ...updateDetails, ...data };
    try {
      const updte = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/resetPassword`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          loading: "Resetting your ASCT password",
          success: <b>Your ASCT password is successfully updated</b>,
          error: <b>Some error occurred</b>,
        }
      );
      if (updte.data.success) {
        setOtpSent(false);
        setOtpVerified(false);
      }
    } catch (galat) {
      toast.error(galat.response.data.message);
    }
  };

  const registerHandler = () => {
    navigate("/register");
  };

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
        className="relative z-10 w-full max-w-md mx-auto"
      >
        {/* Main Container */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
            <div className="relative px-8 py-8 text-center">
              {/* ASCT Logo */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.5 }}
                className="flex justify-center mb-6"
              >
                <img
                  src={logo}
                  alt="ASCT Logo"
                  className="w-24 h-24 cursor-pointer select-none hover:scale-110 transition-transform duration-300"
                  onDoubleClick={handleEasterEggDoubleClick}
                  title="Double click me!"
                />
              </motion.div>

              <motion.h1 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text mb-2"
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-300 text-base font-medium mb-2"
              >
                ASCT - UP Login Portal
              </motion.p>
              <motion.p 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-400 text-sm"
              >
                आज का सहयोग कल का सहारा
              </motion.p>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>

          {/* Form Container */}
          <div className="px-8 pb-8">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-6"
            >
              {/* Mobile Number Field */}
              <div className="group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mobile Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  {...register("mobile")}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Enter your mobile number"
                />
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  {...register("password")}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Enter your password"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  Login to ASCT
                </button>

                <button
                  type="button"
                  onClick={openPopUp}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  Forgot Password?
                </button>

                <button
                  type="button"
                  onClick={registerHandler}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  Create New Account
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>

      {/* Easter Egg Modal */}
      {isEasterEggOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex justify-center items-center bg-gradient-to-br from-purple-600/90 via-pink-600/90 to-red-600/90 backdrop-blur-sm z-50"
          onClick={closeEasterEgg}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{
              scale: [1.1, 1, 1.05, 1],
              opacity: 1,
              y: [0, -20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-md text-center shadow-2xl"
          >
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 mb-4">
              🎉 Thank you for supporting the ASCT! 🎉
            </h2>
            <p className="text-lg text-white font-semibold mb-6">
              You found the Easter egg stuff!
            </p>
            <button
              onClick={closeEasterEgg}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-yellow-500 hover:from-pink-700 hover:to-yellow-600 text-white font-bold hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Forgot Password Modal */}
      {isPopUpOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-lg bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={closePopUp}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 relative w-full max-w-lg py-8 px-8 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopUp}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors duration-300"
            >
              <IoMdCloseCircle className="text-4xl" />
            </button>

            <h1 className="text-2xl text-white font-bold text-center mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Reset Your Password
            </h1>

            {/* Initial Form */}
            <form
              className="space-y-4 mb-6"
              onSubmit={forgetForm.handleSubmit(forgetHandler)}
            >
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mobile Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  {...forgetForm.register("mobile")}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  {...forgetForm.register("email")}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                Send OTP
              </button>
            </form>

            {/* OTP Verification Form */}
            {otpSent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <form
                  className="space-y-4 mb-6"
                  onSubmit={verifyOTPForm.handleSubmit(verifyOTPHandler)}
                >
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Enter OTP <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      {...verifyOTPForm.register("OTP")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400/20"
                      placeholder="Enter the OTP here"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  >
                    Verify OTP
                  </button>
                </form>
              </motion.div>
            )}

            {/* Password Reset Form */}
            {otpVerified && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <form
                  className="space-y-4"
                  onSubmit={updatePassForm.handleSubmit(updatePassHandler)}
                >
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      New Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      {...updatePassForm.register("newPass")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm New Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      {...updatePassForm.register("newPassAgain")}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                      placeholder="Confirm your new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    Update Password
                  </button>
                </form>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LoginComp;