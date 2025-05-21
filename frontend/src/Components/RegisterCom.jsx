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
    <div className={`bg-cover bg-no-repeat min-h-screen w-full flex justify-center items-center py-24`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{
          opacity: [0, 1],
          scale: [0.9, 1],
          y: [60, 0],
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className='w-[1200px] max-w-[90%] rounded-3xl backdrop-blur-sm bg-white bg-opacity-10 text-white py-16'
      >
        <div className='text-3xl font-bold text-center pb-12'>Register ASCT - UP</div>
        <form className='md:px-16 px-9' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex md:flex-row md:justify-between flex-col gap-y-8'>
            <div className='floating-label-container md:w-[45%] w-[100%]'><input type='text' required placeholder='Enter your name' className='placeholder-transparent bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 border-white border' {...register("name")}></input><label className="absolute">Enter your Name<span className="text-red-500">*</span></label></div>

            <div className='floating-label-container md:w-[45%] w-[100%]'><input type='text' required placeholder='Enter your mobile number' className='placeholder-transparent bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 border-white border' {...register("mobile")}></input><label className="absolute">Enter your mobile number<span className="text-red-500">*</span></label></div>
          </div>
          <div className='flex md:flex-row md:justify-between flex-col gap-y-8 mt-8'>
            <div className='floating-label-container md:w-[45%] w-[100%]'><input type='password' required placeholder='Enter the password' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("password")}></input><label className="absolute">Enter your password<span className="text-red-500">*</span></label></div>
            <div className='floating-label-container md:w-[45%] w-[100%]'><input type='password' required placeholder='Enter the password again' className='bg-white bg-opacity-20 rounded-xl w-full py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("confirmPassword")}></input><label className="absolute">Enter your password again<span className="text-red-500">*</span></label></div>
          </div>
          <div className='flex md:flex-row flex-col gap-y-8 md:justify-between mt-12'>
            <div className='floating-label-container md:w-[30%] w-full'><input type='text' required placeholder='Enter Reg No' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("RegNo")}></input><label className="absolute">Enter Registration No.<span className="text-red-500">*</span></label></div>

            <div className='floating-label-container md:w-[30%] w-full'><input type='text' required placeholder='Enter Reg No year' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("RegNoYear")}></input><label className="absolute">Enter Registration No. Year<span className="text-red-500">*</span></label></div>

            <div className='floating-label-container md:w-[30%] w-full'><input type='text' placeholder='Enter the COP No' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("COPNo")}></input><label className="absolute">Enter the COP No.</label></div>
          </div>
          <div className='flex md:flex-row flex-col gap-y-8 md:justify-between mt-12'>
            <div className='floating-label-container md:w-[30%] w-full'><input type='text' placeholder='Enter COP No year' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("COPNoYear")}></input><label className="absolute">Enter the COP No. Year</label></div>

            <div className='floating-label-container md:w-[30%] w-full'><input type='email' required placeholder='Enter your email' className='bg-white bg-opacity-20 rounded-xl md:px-8 px-4 placeholder-transparent border-white border' {...register("email")}></input>
              <label className="absolute">Enter your e-mail id<span className="text-red-500">*</span></label></div>

            <div className='floating-label-container md:w-[30%] w-full'><input type='date' required placeholder='Enter your DOB' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("DOB")}></input><label className="absolute">Enter your Date Of Birth dd-mm-yyy<span className="text-red-500">*</span></label></div>

          </div>
          <div className='flex md:flex-row flex-col gap-y-8 md:justify-between mt-12'>
            <select className='bg-white text-white bg-opacity-20 rounded-xl md:w-[30%] w-full py-2 md:px-8 px-4 placeholder:text-white border-white border' {...register("Gender")} required>
              <option className='text-black' value="">---Choose Your Gender---</option>
              <option className='text-black' value="Male">Male</option>
              <option className='text-black' value="Female">Female</option>
              <option className='text-black' value="Other">Other</option>
            </select>


            <select className='bg-white text-white bg-opacity-20 rounded-xl md:w-[30%] w-full py-2 md:px-8 px-4 placeholder:text-white border-white border' {...register("AdPractice")} required>
              <option className='text-black' value="">---Choose Your Practice Level---</option>
              <option className='text-black' value="Uchh Nyayalay">Uchh Nyayalay</option>
              <option className='text-black' value="Jila Nyayalay">Jila Nyayalay</option>
              <option className='text-black' value="Tehsil Nyayalay">Tehsil Nyayalay</option>
            </select>

            <select className='bg-white text-white bg-opacity-20 rounded-xl md:w-[30%] w-full py-2 md:px-8 px-4 border-white border' onChange={handleDistrictChange} value={selectedDistrict} name="Jila" required>
              <option className='text-black' value="">---Choose Your District---</option>
              {
                districts.map((district) => {
                  return (<option className='text-black' value={district}>{district}</option>)
                })
              }
            </select>


          </div>
          <div className='flex md:flex-row flex-col gap-y-8 md:justify-between mt-12'>
            <select className='bg-white text-white bg-opacity-20 rounded-xl md:w-[30%] w-full py-2 md:px-8 px-4 border-white border' {...register("Tehsil")} required>
              <option className='text-black'>---Choose Your Teshil---</option>
              {
                teshsils.map((tehsil) => {
                  return (<option className='text-black'>{tehsil}</option>)
                })
              }
            </select>

            <select className='bg-white text-white bg-opacity-20 rounded-xl md:w-[30%] w-full py-2 md:px-8 px-4 placeholder:text-white border-white border' {...register("BloodGroup")}>
              <option className='text-black' value="">---Choose Your Blood Group---</option>
              <option className='text-black' value="A+">A+</option>
              <option className='text-black' value="A-">A-</option>
              <option className='text-black' value="B+">B+</option>
              <option className='text-black' value="B-">B-</option>
              <option className='text-black' value="O+">O+</option>
              <option className='text-black' value="O-">O-</option>
            </select>
            <select className='bg-white text-white bg-opacity-20 rounded-xl md:w-[30%] w-full py-2 md:px-8 px-4 border-white border' {...register("HomeDistrict")} required>
              <option className='text-black' value="">---Choose Your Home District---</option>
              {
                districts.map((district) => {
                  return (<option className='text-black' value={district}>{district}</option>)
                })
              }
            </select>
          </div>
          <div className='flex justify-between mt-12'>
            <div className='floating-label-container w-[100%]'><input type='text' placeholder='Enter your Home Address' className='bg-white bg-opacity-20 rounded-xl py-2 md:px-8 px-4 placeholder-transparent border-white border' {...register("HomeAddress")} required></input> <label className="absolute">Enter your Home Address<span className="text-red-500">*</span></label></div>
          </div>
          <div className='flex flex-col'>
            <button type='submit' className='bg-blue-600 py-3 text-xl rounded-xl mt-20 mb-8'>Register</button>
            <button className='bg-green-600 py-3 text-xl rounded-xl' type='button' onClick={() => { navigate("/login") }}>Login</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default RegisterCom
