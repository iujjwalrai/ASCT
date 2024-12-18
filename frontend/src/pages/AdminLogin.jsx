import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from "js-cookie"
import Footer from '../Components/Footer'
const AdminLogin = () => {


    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate();
    const submitHandler = async(data)=>{
        console.log(data);
        try{
            const response = await toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/login`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }), {
                loading: "Logging you in securely",
                success: <b>Successfully Logged You In</b>,
                error: <b>Error in Logging you in</b>
            });
            if(Cookies.get("adminToken")){
                reset();
                navigate("/admin/dashboard");
            }
            else{
                console.log("Token is not found Please try again later")
            }
        }
        catch(e){
            console.error("Login error:", e);
            toast.error("Something went wrong. Please try again.");
        }
    }

  return (
    <div className='bg-[#D5C5C8] min-h-[70vh]'>
        <h1 className='py-8 text-2xl font-bold text-center underline'>Welcome to the ADMIN LOGIN of ADVOCATES SELF CARE TEAM- UP</h1>
        <h3 className='h-1 w-[80%] bg-green-600 mx-auto'></h3>
        <div className='flex justify-center items-center mt-10 py-10'>
            <form className='flex flex-col justify-between min-w-[50%] min-h-[300px] bg-black bg-opacity-35 px-10 py-8 rounded-3xl' onSubmit={handleSubmit(submitHandler)}>
                <h2 className='text-red-700 font-bold text-center text-2xl'>Login Securely</h2>
                <input type='text' placeholder='Enter your phone number' className='px-6 h-10 rounded-xl placeholder:text-black' required {...register("mobile")}></input>
                <input type='password' placeholder='Enter the password' className='px-6 h-10 rounded-xl placeholder:text-black' {...register("password")}></input>
                <button type='submit' className='bg-blue-500 h-10 rounded-xl text-white  hover:bg-blue-800 duration-300' required>Login</button>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default AdminLogin