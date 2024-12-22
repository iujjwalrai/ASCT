import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import SahyogCard from './SahyogCard'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
const AllSahyog = () => {

  const [sahyogs, setSahyogs] = useState([]);
  const fetchSahyogs = async ()=>{
    try{
      const responseFromServer = await toast.promise(axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/allSahyog`, {
        withCredentials: true
      }), {
        loading: "Fetching All Sahyogs",
        success: <b>Fetched all the details successfully</b>,
        error : <b>Could not fetch data. Please try again</b>
      });

      setSahyogs(responseFromServer.data.sahyogs);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchSahyogs();
  }, [])
  
  if(sahyogs.length===0){
    return (
      <div className='flex bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-2'>
        <Sidebar/>
        <div>
          No Sahyogs to display
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-6 relative min-h-screen">
      <Sidebar/>
      <div className='mt-5'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-3'>
          {
            sahyogs.map((sahyog)=>{
              return <SahyogCard sahyog={sahyog}/>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AllSahyog