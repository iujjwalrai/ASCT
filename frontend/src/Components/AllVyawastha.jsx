import React, { useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios';
import VyawasthaCard from './VyawasthaCard';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
const AllVyawastha = () => {

  const [vyawasthas, setVyawasthas] = useState([]);


  const fetchVyawasthas = async()=>{
    try{
      const responseFromServer = await toast.promise(axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/allVyawastha`, {
        withCredentials: true
      }), {
        loading: "Fetching All Vyawasthas",
        success: <b>Fetched all the details successfully</b>,
        error : <b>Could not fetch data. Please try again</b>
      });

      setVyawasthas(responseFromServer.data.vyawasthas);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
      fetchVyawasthas();
  }, []);



  if(vyawasthas.length===0){
    return (
      <div className='flex bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-2'>
        <Sidebar/>
        <div>
          No Vyawasthas to display
        </div>
      </div>
    )
  }

  return (
    <div className='flex bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-2'>
      <Sidebar/>
      <div className='mt-5'>
        <div className='grid grid-cols-3 gap-x-3'>
          {
            vyawasthas.map((vyawastha)=>{
              return <VyawasthaCard vyawastha={vyawastha}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AllVyawastha