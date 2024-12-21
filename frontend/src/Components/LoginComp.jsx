import React from 'react';
import backgroundImage from '../assets/images/logniImage2.jpg';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';
import Cookies from "js-cookie";

const LoginComp = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    console.log(data);
    try {
      const responseFromServer = await toast.promise(
        axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/login`, JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }), {
        loading: "Logging You In ..... ",
        success: <b>Successfully Logged You In</b>,
        error: <b>Error in logging you in</b>
      });

      if (responseFromServer.data.success) {
        Cookies.set('token', 'true', { path: '/' });
        const res = dispatch(login());
        reset();
        navigate("/advocates/dashboard");
      } else {
        console.log("Token is not found. Please try again later");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`bg-cover bg-no-repeat min-h-screen w-full flex justify-center items-center py-24`}
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='w-[600px] max-w-[90%] h-[650px] max-h-[85%] rounded-3xl text-white bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='py-10 text-center font-bold text-3xl'>Login ASCT - UP</div>
        <form className='flex flex-col px-8 sm:px-20' onSubmit={handleSubmit(submitHandler)}>
          <input
            type='text'
            className='h-12 bg-white bg-opacity-20 border-white border rounded-xl px-4 sm:px-10 placeholder:text-white placeholder:text-sm sm:placeholder:text-lg text-lg'
            placeholder='Enter your mobile number'
            {...register("mobile")}
          />
          <input
            type='password'
            className='h-12 bg-white bg-opacity-20 border-white border rounded-xl px-4 sm:px-10 placeholder:text-white placeholder:text-sm sm:placeholder:text-lg text-lg mt-8 sm:mt-16'
            placeholder='Enter your password'
            {...register("password")}
          />
          <button
            type='submit'
            className='bg-blue-600 py-3 text-lg sm:text-xl rounded-xl mt-12 sm:mt-20 mb-4 sm:mb-8'>
            Login
          </button>
          <button
            className='bg-red-700 py-3 text-lg sm:text-xl rounded-xl mb-4 sm:mb-8'>
            Forget password ?
          </button>
          <button
            className='bg-green-600 py-3 text-lg sm:text-xl rounded-xl'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComp;
