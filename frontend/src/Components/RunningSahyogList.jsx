import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import SahyogCard from './SahyogCard'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
const RunningSahyogList = () => {

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
      const filteredSahyog = responseFromServer.data.sahyogs.filter((sahyog)=>{
        return sahyog.isCompleted == false
      })
      setSahyogs(filteredSahyog);
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
    <div className='flex bg-gradient-to-tl from-blue-500 via-purple-400 to-white gap-2'>
      <Sidebar/>
      <div className='mt-5'>
        <div className='grid grid-cols-2 gap-x-3 gap-y-3'>
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

export default RunningSahyogList