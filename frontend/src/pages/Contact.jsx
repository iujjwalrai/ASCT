import React from 'react'
import Footer from '../Components/Footer'
import {useForm} from "react-hook-form"
import { FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from "axios"
const Contact = () => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm();

  // Form submission handler

  const onSubmit = async (data)=>{
    console.log(data);
    console.log("Printing the response of the server .....");
    console.log(process.env.REACT_APP_ASCT_BASE_API_URL)

    const responseFromServer = await toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/contact/contactUs`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      },
    }), {
      loading: 'Sending your message to ASCT-UP',
      success: <b>Message sent to ASCT-UP</b>,
      error: <b>Could not send message to ASCT-UP</b>
    })
    console.log(responseFromServer);
    reset();
  }

  return (
    <div>
      <div className='text-3xl font-bold text-blue-700 py-4 text-center'>Contact Us</div>
      <div className='text-center text-md font-semibold'>किसी भी समस्या के लिए पहले अपनी जिला टीम से सम्पर्क करेगे, उसके बाद आवश्यकता पड़े तो दिन में 10 बजे से 1 बजे तक काल कर सकते हैं|</div>
      <div className='flex justify-evenly my-14'>
        <div className='border-t-[3vh] border-blue-950 w-[60vw] max-w-[80vw] rounded-2xl shadow-2xl py-8 px-8 flex justify-between items-center'>
          <div className='w-[40%]'>
            <h2 className='text-3xl font- font-semibold font-sans text-blue-950'>Contact Us</h2>
            <form className='pt-6' onSubmit={handleSubmit(onSubmit)}>
              <input type='text' placeholder='Enter your name' className='bg-blue-100 py-2 rounded-2xl px-6 w-[100%]' {...register('name', {required: 'Name is required'})}></input>{errors.name && <span className='text-red-600 font-bold py-3 px-3'>{errors.name.message}</span>}


              <input type='text' placeholder='Enter the subject' className='bg-blue-100 py-2 rounded-2xl px-6 w-[100%] mt-4' {...register('subject', {required: 'Subject is required'})}></input>{errors.subject && <span className='text-red-600 font-bold py-3 px-3'>{errors.subject.message}</span>}


              <input type='text' placeholder='Enter your mobile number' className='bg-blue-100 py-2 rounded-2xl px-6 w-[100%] mt-4' {...register('mobile', {required: 'Mobile number is required', minLength: {value: 10, message:'Phone number should be of 10 digits'}, maxLength:{value:10, message:'Phone number should be of maximum 10 digits'}})}></input>{errors.mobile && <span className='text-red-600 font-bold py-3 px-3'>{errors.mobile.message}</span>}


              <input type='email' placeholder='Enter your E-mail' className='bg-blue-100 py-2 rounded-2xl px-6 w-[100%] mt-4' {...register('email', {required: "Email is required"})}></input>{errors.email && <span className='text-red-600 font-bold py-3 px-3'>{errors.email.message}</span>}


              <textarea placeholder='Enter your message' className='bg-blue-100 py-2 rounded-2xl px-6 w-[100%] h-[6rem] mt-4' {...register('message', {required: "Please enter your message"})}></textarea>
              <button type="submit" className='bg-green-500 py-3 px-4 w-[100%] mt-6 rounded-md hover:rounded-3xl duration-100 hover:border-green-900 hover:border-4 text-black font-bold'>Send the Message</button>
            </form>
          </div>
          <div className='w-[40%]'>
            <img src='https://res.cloudinary.com/dkvuuyi2k/image/upload/v1730962245/croppedContactUs_uqxjaw.jpg' className='rounded-3xl'></img>
          </div>
        </div>
        <div>
        <FaHome className='text-3xl'/>
        <h3 className='text-lg font-semibold text-blue-800'>Rautpar Post - Gandhinagar</h3>
        <h3 className='text-lg font-semibold text-red-600'>District Basti, UP 272001</h3>
        <FaPhoneAlt className='text-2xl mt-10'/>
        <h3 className='text-lg font-semibold text-red-600'>7007357961 एवं 7007074437</h3>
        <IoMail className='mt-10 text-3xl'/>
        <h3 className='text-lg font-semibold text-blue-800'>advocatesselfcareteam@gmail.com</h3>
        <h3 className='text-lg font-semibold text-red-600'>Send us your query at any time!</h3>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact