import React from 'react'
import Sidebar from './Sidebar'
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'
const UpdatePass = () => {
    const advo = useSelector((state) => state.user.userDetails);

    const userId = advo._id

    const {register, handleSubmit, reset} = useForm();

    const updateHandler = async(data)=>{
        data.userId = userId
        try{
            const responseFromServer = await toast.promise(axios.put(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/updatePass`, data, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            }), {
                loading: "Updating your password",
                success: <b>Updated the password successfully</b>,
                error: <b>An error occured while updating the password</b>
            });

            reset();
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative md:items-start min-h-screen">
        <Sidebar/>
        <div className="mt-16 w-full md:w-[70vw] max-w-[95vw] bg-blue-100 shadow-2xl shadow-black rounded-3xl md:px-16 px-3 py-8 mx-auto">
            <h1 className='text-center text-2xl text-red-600 font-bold'>Welcome to the Update Password Section</h1>
            <h2 className='text-center text-2xl text-yellow-500 font-bold mt-8'>To update the password, Please fill the below form carefully</h2>
            <div className='flex justify-center py-8'>
                <form className='flex flex-col md:w-[80%] w-[100%] gap-6 shadow-red-400 shadow-xl rounded-2xl px-5 py-10' onSubmit={handleSubmit(updateHandler)}>
                    <input type='password' placeholder='Enter the current password' {...register("oldPass")} required className='h-10 px-3 placeholder:text-black rounded-xl'></input>
                    <input type='password' placeholder='Enter the new password' required {...register("newPass")} className='h-10 px-3 placeholder:text-black rounded-xl'></input>
                    <input type='password' placeholder='Enter the new password again' required {...register("newPassAgain")} className='h-10 px-3 placeholder:text-black rounded-xl'></input>
                    <button type='submit' className='bg-red-500 py-2 text-white text-lg font-bold hover:bg-green-600 duration-300 rounded-2xl'>Update the password</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default UpdatePass