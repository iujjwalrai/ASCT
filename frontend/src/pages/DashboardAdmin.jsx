import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({})
  const fetchAdminDetails = async()=>{
    try{
      setLoading(true);
      const responseFromServer = await axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/profile`,{
        withCredentials: true
      })

      const adminjankaari = responseFromServer.data.admin;
      console.log(adminjankaari)
      setAdminData(adminjankaari);
      setLoading(false);
    }
    catch(er){
      console.log(er)
      setLoading(false);
    }
  }

  const sahyogForm = useForm();
  const vyawasthaForm= useForm();
  const vyawasthaComp = useForm();
  const sahyogComp = useForm();
  const sahyogHandler = async(data)=>{
    try{
      console.log(data);
      const sahyogResponse = toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/createSahyog`, data, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      }), {
        loading: "Creating Sahyog",
        success: <b>Sahyog Created Successfully !!</b>,
        error: <b>Error in Creating the sahyog</b>
      })
      sahyogForm.reset();
    }
    catch(e){
      toast.error("Something went wrong")
    }
  }

  const vyawasthaHandler = async(data)=>{
    try{
      console.log(data);
      const vyawasthaResponse = toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/createVyawastha`, data, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      }), {
        loading: "Creating Vyawastha",
        success: <b>Vyawastha Created Successfully !!</b>,
        error: <b>Error in Creating the Vyawastha</b>
      })
      vyawasthaForm. reset();
    }
    catch(e){
      console.log(e)
      toast.error("Something went wrong")
    }
  }

  const handleSahyogComp = async(data)=>{
    try{
      const vapas = await toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/sahyogComp`, data, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      }), {
        loading: "Marking as complete",
        success: <b>Marked as complete</b>,
        error: <b>Some error occurred</b>
      })
    }
    catch(gal){
      console.error(gal);
      toast.error("Please try again later");
    }
  }

  const handleVyawasthaComp = async(data)=>{
    try{
      const vapas = await toast.promise(axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/vyawasthaComp`, data, {
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      }), {
        loading: "Marking as complete",
        success: <b>Marked as complete</b>,
        error: <b>Some error occurred</b>
      })
    }
    catch(gal){
      console.error(gal);
      toast.error("Please try again later");
    }
  }


  const logoutHandler = async()=>{
    try{
      const vap = await axios.post(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/logout`, null, {withCredentials: true});
      navigate("/");
      toast.success("Logged out successfully");
    }
    catch(e){
      navigate("/");
      toast.success("Logged out successfully");
    }
    navigate("/");
    toast.success("Logged out successfully")
  }

  useEffect(()=>{
    fetchAdminDetails();
  }, []);

  if(loading){
    return(
      <div className='flex justify-center items-center min-h-[70vh] text-blue-800 text-3xl'>Loading . . . .</div>
    )
  }
  return (
    <div className='relative'>
      <div className='absolute bg-red-600 text-white py-5 px-8 rounded-full right-10 top-6 cursor-pointer font-bold text-lg' onClick={logoutHandler}> Logout </div>
      <h1 className='text-red-800 text-2xl font-bold py-4 text-center'>Welcome to the Admin Dashboard {adminData.name}</h1>
      <h2 className='text-blue-600 text-xl my-3 font-semibold text-center'>To add a new Sahyog</h2>
      <div className='flex justify-center'>
        <form onSubmit={sahyogForm.handleSubmit(sahyogHandler)} className='min-w-[700px] flex flex-col py-10 px-10 bg-black bg-opacity-25 gap-6 rounded-3xl'>
          <input type='text' placeholder='Enter the Object Id of the User whose Sashyog is to be Collected' {...sahyogForm.register('user')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the name of the Sahyog' {...sahyogForm.register('name')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the description of the Sahyog' {...sahyogForm.register('description')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the amount of the Sahyog to be collected' {...sahyogForm.register('amount')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the nominee Account Holder name' {...sahyogForm.register('nomineeName')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the Account no. 1 of the nominee' {...sahyogForm.register('nomineeAccount1No')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the Account 1 IFSC of the nominee' {...sahyogForm.register('nomineeAccount1ifsc')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the Account no. 2 of the nominee' {...sahyogForm.register('nomineeAccount2No')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the Account 2 IFSC of the nominee' {...sahyogForm.register('nomineeAccount2ifsc')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <button type='submit' className='bg-blue-600 py-3 text-white rounded-xl hover:bg-blue-900 duration-300'>Create Sahyog</button>
        </form>
      </div>
      <h2 className='text-blue-600 text-xl my-3 font-semibold text-center'>To add a new Vyawastha Shulk</h2>
      <div className='flex justify-center'>
        <form onSubmit={vyawasthaForm.handleSubmit(vyawasthaHandler)} className='min-w-[700px] flex flex-col py-10 px-10 bg-black bg-opacity-25 gap-6 rounded-3xl'>
          <input type='text' placeholder='Enter the name of the Vyawastha' {...vyawasthaForm.register('name')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the description of the Vyawastha' {...vyawasthaForm.register('description')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <input type='text' placeholder='Enter the amount of the Vyawastha to be collected' {...vyawasthaForm.register('amount')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <button type='submit' className='bg-blue-600 py-3 text-white rounded-xl hover:bg-blue-900 duration-300'>Create Vyawastha</button>
        </form>
      </div>
      <h2 className='text-blue-600 text-xl my-3 font-semibold text-center'>To mark a Sahyog as completed</h2>
      <div className='flex justify-center'>
        <form onSubmit={sahyogComp.handleSubmit(handleSahyogComp)} className='min-w-[700px] flex flex-col py-10 px-10 bg-black bg-opacity-25 gap-6 rounded-3xl'>
          <input type='text' placeholder='Enter the Object Id of the Sahyog' {...sahyogComp.register('id')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <button type='submit' className='bg-blue-600 py-3 text-white rounded-xl hover:bg-blue-900 duration-300'>Mark as Completed</button>
        </form>
      </div>
      <h2 className='text-blue-600 text-xl my-3 font-semibold text-center'>To mark a Vyawastha as completed</h2>
      <div className='flex justify-center'>
        <form onSubmit={vyawasthaComp.handleSubmit(handleVyawasthaComp)} className='min-w-[700px] flex flex-col py-10 px-10 bg-black bg-opacity-25 gap-6 rounded-3xl'>
          <input type='text' placeholder='Enter the Object Id of the Vyawastha' {...vyawasthaComp.register('id')} className='px-3 py-3 rounded-xl placeholder:text-black'></input>
          <button type='submit' className='bg-blue-600 py-3 text-white rounded-xl hover:bg-blue-900 duration-300'>Mark as Completed</button>
        </form>
      </div>
    </div>
  )
}

export default DashboardAdmin