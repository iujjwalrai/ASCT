import React from 'react'
import backgroundImage from '../assets/images/logniImage2.jpg';
import {useForm} from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {upDistrictsAndTehsils} from '../assets/upDistrictsAndTeshils'
import toast from 'react-hot-toast';
import axios from 'axios';

const districts = Object.keys(upDistrictsAndTehsils);
const RegisterCom = () => {
  const navigate = useNavigate();
  const[selectedDistrict, setSelectedDistrict] = useState("");
  const[teshsils, setTehsils] = useState([])

  const handleDistrictChange = (event)=>{
    const dis = event.target.value;
    setSelectedDistrict(dis);
    setTehsils(dis ? upDistrictsAndTehsils[dis] : [])
  }

  const {register, handleSubmit, formState:{errors}, reset} = useForm();

  const submitHandler = async(data)=>{
    const formData = {...data, Jila:selectedDistrict}

    console.log(formData);

    try{
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
      console.log(responseFromServer);
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
    catch(er){
      console.log(er)
    }
    
  }

  return (
    <div className={`bg-cover bg-no-repeat min-h-screen w-full flex justify-center items-center py-24`} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='w-[1200px] max-w-[90%] rounded-3xl backdrop-blur-sm bg-white bg-opacity-10 text-white py-16'>
        <div className='text-3xl font-bold text-center pb-12'>Register ASCT - UP</div>
        <form className='px-16' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex justify-between'>
            <input type='text' placeholder='Enter your name' className='bg-white bg-opacity-20 rounded-xl w-[45%] py-2 px-8 placeholder:text-white border-white border' {...register("name", {required: "Name is required field"})}></input>
            
            {errors.name && <span className='text-red-600 font-bold py-3 px-3'>{errors.name.message}</span>}

            <input type='text' placeholder='Enter your mobile number' className='bg-white bg-opacity-20 rounded-xl w-[45%] py-2 px-8 placeholder:text-white border-white border' {...register("mobile", {required: "Mobile is required field"})}></input>

            {errors.mobile && <span className='text-red-600 font-bold py-3 px-3'>{errors.mobile.message}</span>}
          </div>
          <div className='flex justify-between mt-12'>
            <input type='password' placeholder='Enter the pssword' className='bg-white bg-opacity-20 rounded-xl w-[45%] py-2 px-8 placeholder:text-white border-white border' {...register("password", {required: "Password is a required field"})}></input>

            {errors.password && <span className='text-red-600 font-bold py-3 px-3'>{errors.password.message}</span>}


            <input type='password' placeholder='Enter the password again' className='bg-white bg-opacity-20 rounded-xl w-[45%] py-2 px-8 placeholder:text-white border-white border'></input>
          </div>
          <div className='flex justify-between mt-12'>
            <input type='text' placeholder='Enter Reg No' className='bg-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("RegNo", {required: "Reg No is a required field"})}></input>

            {errors.RegNo && <span className='text-red-600 font-bold py-3 px-3'>{errors.RegNo.message}</span>}

            <input type='text' placeholder='Enter Reg No year' className='bg-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("RegNoYear", {required: "Reg No Year is a required field"})}></input>

            {errors.RegNoYear && <span className='text-red-600 font-bold py-3 px-3'>{errors.RegNoYear.message}</span>}

            <input type='text' placeholder='Enter the COP No' className='bg-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("COPNo", {required: "COP No is a required field"})}></input>

            {errors.COPNo && <span className='text-red-600 font-bold py-3 px-3'>{errors.COPNo.message}</span>}

          </div>
          <div className='flex justify-between mt-12'>
            <input type='text' placeholder='Enter COP No year' className='bg-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("COPNoYear", {required: "COP NO Year is a required field"})}></input>

            {errors.COPNoYear && <span className='text-red-600 font-bold py-3 px-3'>{errors.COPNoYear.message}</span>}


            <input type='email' placeholder='Enter your email' className='bg-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("email", {required: "Email is a required field"})}></input>

            {errors.email && <span className='text-red-600 font-bold py-3 px-3'>{errors.email.message}</span>}


            <input type='date' placeholder='Enter your DOB' id="dob" className='bg-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border'{...register("DOB",{required: "DOB is a required field"})}></input>

            {errors.DOB && <span className='text-red-600 font-bold py-3 px-3'>{errors.DOB.message}</span>}
          </div>
          <div className='flex justify-between mt-12'>
            <select className='bg-white text-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("Gender", {required: "Gender is a required field"})}>
            <option className='text-black' value="">---Choose Your Gender---</option>
              <option className='text-black' value="Male">Male</option>
              <option className='text-black' value="Female">Female</option>
              <option className='text-black' value="Other">Other</option>
            </select>

            {errors.Gender && <span className='text-red-600 font-bold py-3 px-3'>{errors.Gender.message}</span>}

            <select className='bg-white text-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("AdPractice", {required: "This is a required field"})}>
              <option className='text-black' value="">---Choose Your Practice Level---</option>
              <option className='text-black' value="Uchh Nyayalay">Uchh Nyayalay</option>
              <option className='text-black' value="Jila Nyayalay">Jila Nyayalay</option>
              <option className='text-black' value="Tehsil Nyayalay">Tehsil Nyayalay</option>
            </select>

            {errors.AdPractice && <span className='text-red-600 font-bold py-3 px-3'>{errors.AdPractice.message}</span>}
            <select className='bg-white text-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 border-white border' onChange={handleDistrictChange} value={selectedDistrict} name="Jila">
              <option className='text-black' value="">---Choose Your District---</option>
              {
                districts.map((district)=>{
                  return (<option className='text-black' value={district}>{district}</option>)
                })
              }
            </select>


          </div>
          <div className='flex justify-between mt-12'>
            <select className='bg-white text-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 border-white border' {...register("Tehsil", {required: "This is a required field"})}>
              <option className='text-black'>---Choose Your Teshil---</option>
              {
                 teshsils.map((tehsil)=>{
                  return (<option className='text-black'>{tehsil}</option>)
                 })
              }
            </select>

            {errors.Tehsil && <span className='text-red-600 font-bold py-3 px-3'>{errors.Tehsil.message}</span>}
            <select className='bg-white text-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 placeholder:text-white border-white border' {...register("BloodGroup")}>
              <option className='text-black' value="">---Choose Your Blood Group---</option>
              <option className='text-black' value="A+">A+</option>
              <option className='text-black' value="A-">A-</option>
              <option className='text-black' value="B+">B+</option>
              <option className='text-black' value="B-">B-</option>
              <option className='text-black' value="O+">O+</option>
              <option className='text-black' value="O-">O-</option>
            </select>
            <select className='bg-white text-white bg-opacity-20 rounded-xl w-[30%] py-2 px-8 border-white border' {...register("HomeDistrict", {required: "This is a required field"})}>
              <option className='text-black' value="">---Choose Your Home District---</option>
              {
                districts.map((district)=>{
                  return (<option className='text-black' value={district}>{district}</option>)
                })
              }
            </select>
            {errors.HomeDistrict && <span className='text-red-600 font-bold py-3 px-3'>{errors.HomeDistrict.message}</span>}
          </div>
          <div className='flex justify-between mt-12'>
            <input type='text' placeholder='Enter your Home Address' className='bg-white bg-opacity-20 rounded-xl w-[100%] py-2 px-8 placeholder:text-white border-white border' {...register("HomeAddress", {required: "This is a required field"})}></input>

            {errors.HomeAddress && <span className='text-red-600 font-bold py-3 px-3'>{errors.HomeAddress.message}</span>}
          </div>
          <div className='flex flex-col'>
            <button type='submit' className='bg-blue-600 py-3 text-xl rounded-xl mt-20 mb-8'>Register</button>
            <button className='bg-red-700 py-3 text-xl rounded-xl mb-8'>Forget password ? </button>
            <button className='bg-green-600 py-3 text-xl rounded-xl'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterCom