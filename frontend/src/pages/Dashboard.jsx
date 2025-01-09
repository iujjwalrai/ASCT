import React, { useState } from 'react'
import DashboardComp from '../Components/DashboardComp'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'
import axios from 'axios'
import { useEffect } from 'react'

const Dashboard = () => {

  const dispatch = useDispatch();
  const[loading, setLoading] = useState([]);
  const getAdvocate = async()=>{
    try{
      setLoading(true);
      const responseFromServer = await axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/my-profile`, {
        withCredentials: true
    })

    const advocateData = responseFromServer.data.user;
    dispatch(setUser(advocateData));
    setLoading(false);
    }
    catch(error){
      setLoading(false);
    }
}

useEffect(()=>{
    getAdvocate();
}, []);
  return (
    <div>
      {
        loading ? (<div className="flex items-center justify-center h-screen">
          <div className="text-xl font-semibold text-blue-600">Loading...</div>
        </div>): (<Outlet/>)
      }
    </div>
  )
}

export default Dashboard