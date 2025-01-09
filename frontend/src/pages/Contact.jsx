import React from 'react';
import Footer from '../Components/Footer';
import { useForm } from 'react-hook-form';
import { FaHome, FaPhoneAlt } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';
import toast from 'react-hot-toast';
import axios from 'axios';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    try{
      const responseFromServer = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/contact/contactUs`,
          JSON.stringify(data),
          { headers: { 'Content-Type': 'application/json' } }
        ), {
          loading: 'Sending your message to ASCT-UP',
          success: <b>Message sent to ASCT-UP</b>,
          error: <b>Could not send message to ASCT-UP</b>
        }
      );
      reset();
    }
    catch(er){
      toast.error(er.response.data.message);
    }
  };

  return (
    <div>
      <div className="text-3xl font-bold text-blue-700 py-4 text-center">Contact Us</div>
      <div className="text-center text-md font-semibold">किसी भी समस्या के लिए पहले अपनी जिला टीम से सम्पर्क करेगे, उसके बाद आवश्यकता पड़े तो दिन में 10 बजे से 1 बजे तक काल कर सकते हैं|</div>
      <div className="md:flex md:justify-evenly md:flex-row my-14 flex flex-col items-center px-4">
        <div className="border-t-[3vh] border-blue-950 md:w-[60vw] sm:w-[90%] max-w-[600px] rounded-2xl shadow-2xl py-8 px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full px-4">
            <h2 className="text-3xl font-semibold font-sans text-blue-950">Contact Us</h2>
            <form className="pt-6" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Enter your name"
                className="bg-blue-100 py-2 rounded-2xl px-6 w-full"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className="text-red-600 font-bold py-1">{errors.name.message}</span>}

              <input
                type="text"
                placeholder="Enter the subject"
                className="bg-blue-100 py-2 rounded-2xl px-6 w-full mt-4"
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && <span className="text-red-600 font-bold py-1">{errors.subject.message}</span>}

              <input
                type="text"
                placeholder="Enter your mobile number"
                className="bg-blue-100 py-2 rounded-2xl px-6 w-full mt-4"
                {...register('mobile', {
                  required: 'Mobile number is required',
                  minLength: { value: 10, message: 'Phone number should be of 10 digits' },
                  maxLength: { value: 10, message: 'Phone number should be of maximum 10 digits' }
                })}
              />
              {errors.mobile && <span className="text-red-600 font-bold py-1">{errors.mobile.message}</span>}

              <input
                type="email"
                placeholder="Enter your E-mail"
                className="bg-blue-100 py-2 rounded-2xl px-6 w-full mt-4"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-red-600 font-bold py-1">{errors.email.message}</span>}

              <textarea
                placeholder="Enter your message"
                className="bg-blue-100 py-2 rounded-2xl px-6 w-full h-[6rem] mt-4"
                {...register('message', { required: 'Please enter your message' })}
              />
              <button
                type="submit"
                className="bg-green-500 py-3 px-4 w-full mt-6 rounded-md hover:rounded-3xl duration-300 hover:border-green-900 hover:border-4 text-black font-bold"
              >
                Send the Message
              </button>
            </form>
          </div>
          <div className="w-full md:w-[100%] mt-8 md:mt-0 flex justify-center">
            <img
              src="https://res.cloudinary.com/dkvuuyi2k/image/upload/v1730962245/croppedContactUs_uqxjaw.jpg"
              className="rounded-3xl max-w-full md:max-w-[80%] sm:w-[90%]"
              alt="Contact Us"
            />
          </div>
        </div>
        <div className="mt-8 md:mt-0 text-center">
          <FaHome className="text-3xl mx-auto" />
          <h3 className="text-lg font-semibold text-blue-800">Rautpar Post - Gandhinagar</h3>
          <h3 className="text-lg font-semibold text-red-600">District Basti, UP 272001</h3>
          <FaPhoneAlt className="text-2xl mt-10 mx-auto" />
          <h3 className="text-lg font-semibold text-red-600">7007357961 एवं 7007074437</h3>
          <IoMail className="mt-10 text-3xl mx-auto" />
          <h3 className="text-lg font-semibold text-blue-800">advocatesselfcareteam@gmail.com</h3>
          <h3 className="text-lg font-semibold text-red-600">Send us your query at any time!</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
