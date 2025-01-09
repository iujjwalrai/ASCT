import React, { useState } from "react";
import backgroundImage from "../assets/images/logniImage2.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuth, logout } from "../redux/slices/authSlice";
import { scheduleAutoLogout } from "../redux/slices/authSlice";
import logo from "../assets/images/Logo_Transparent_BG.png";
import { IoMdCloseCircle } from "react-icons/io";
const LoginComp = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const forgetForm = useForm();
  const verifyOTPForm = useForm();
  const updatePassForm = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div
      className={`bg-cover bg-no-repeat min-h-screen w-full flex justify-center items-center py-24 relative`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-[600px] max-w-[90%] h-[650px] max-h-[85%] rounded-3xl text-white bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="py-10 text-center font-bold text-3xl">
          Login ASCT - UP
        </div>
        <form
          className="flex flex-col px-8 sm:px-20"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="floating-label-container">
            <input
              type="text"
              className="peer h-12 bg-white bg-opacity-20 border-white border rounded-xl px-4 sm:px-10 placeholder-transparent text-lg"
              placeholder="Enter your mobile number"
              {...register("mobile")}
            />
            <label className="absolute">Enter your mobile number</label>
          </div>

          <div className="floating-label-container mt-8 sm:mt-16">
            <input
              type="password"
              className="peer h-12 bg-white bg-opacity-20 border-white border rounded-xl px-4 sm:px-10 placeholder-transparent text-lg"
              placeholder="Enter your password"
              {...register("password")}
            />
            <label className="absolute">Enter your password</label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 py-3 text-lg sm:text-xl rounded-xl mt-12 sm:mt-20 mb-4 sm:mb-8"
          >
            Login
          </button>
          <button
            className="bg-red-700 py-3 text-lg sm:text-xl rounded-xl mb-4 sm:mb-8"
            type="button"
            onClick={openPopUp}
          >
            Forget password ?
          </button>
          <button
            className="bg-green-600 py-3 text-lg sm:text-xl rounded-xl"
            onClick={registerHandler}
            type="button"
          >
            Register
          </button>
        </form>
      </div>
      {isPopUpOpen && (
        <div
          className="fixed top-0 bottom-0 right-0 left-0 backdrop-blur-lg flex justify-center items-center"
          onClick={closePopUp}
        >
          <div
            className="bg-white relative w-[850px] max-w-[90%] py-6 px-8 rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <IoMdCloseCircle
              className="absolute top-0 right-1 text-5xl cursor-pointer  text-red-600"
              onClick={closePopUp}
            />
            <h1 className="text-xl text-red-600 font-bold text-center">
              Have You Forget Your Password??
            </h1>
            <form
              className="flex flex-col gap-y-3"
              onSubmit={forgetForm.handleSubmit(forgetHandler)}
            >
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="py-2 px-3 rounded-lg bg-blue-200 placeholder:text-black"
                required
                {...forgetForm.register("mobile")}
              ></input>
              <input
                type="email"
                placeholder="Enter your E-mail"
                className="py-2 px-3 rounded-lg bg-blue-200 placeholder:text-black"
                required
                {...forgetForm.register("email")}
              ></input>
              <button
                type="submit"
                className="text-lg bg-red-600 py-2 text-white rounded-xl hover:bg-green-600 duration-300 ease-in-out"
              >
                Click here to send OTP
              </button>
            </form>
            {otpSent && (
              <div>
                <form
                  className="flex flex-col gap-y-3 mt-6"
                  onSubmit={verifyOTPForm.handleSubmit(verifyOTPHandler)}
                >
                  <input
                    type="password"
                    placeholder="Enter the OTP here"
                    className="py-2 px-3 rounded-lg bg-blue-200 placeholder:text-black"
                    {...verifyOTPForm.register("OTP")}
                  ></input>
                  <button
                    type="submit"
                    className="text-lg bg-green-600 py-2 text-white rounded-xl hover:bg-red-600 duration-300 ease-in-out"
                  >
                    Click here to verify OTP
                  </button>
                </form>
              </div>
            )}
            {otpVerified && (
              <div>
                <form
                  className="flex flex-col gap-y-3 mt-6"
                  onSubmit={updatePassForm.handleSubmit(updatePassHandler)}
                >
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="py-2 px-3 rounded-lg bg-blue-200 placeholder:text-black"
                    {...updatePassForm.register("newPass")}
                  ></input>
                  <input
                    type="password"
                    placeholder="Enter your new password again"
                    className="py-2 px-3 rounded-lg bg-blue-200 placeholder:text-black"
                    {...updatePassForm.register("newPassAgain")}
                  ></input>
                  <button
                    type="submit"
                    className="text-lg bg-green-600 py-2 text-white rounded-xl hover:bg-red-600 duration-300 ease-in-out"
                  >
                    Click here to update the password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginComp;
