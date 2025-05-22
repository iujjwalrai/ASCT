import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Menu from './Components/Menu'
import Home from './pages/Home'
import About from './pages/About'
import TeachersList from './pages/AdvocatesList'
import SahyogList from './pages/SahyogList'
import VyawasthaList from './pages/VyawasthaList'
import Niyamawali from './pages/Niyamawali'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import DashboardComp from './Components/DashboardComp'
import Profile from './Components/Profile'
import ProtectedRouteAd from './pages/ProtectedRouteAd'
import IdCard from './Components/IdCard'
import RunningSahyogList from './Components/RunningSahyogList'
import AllSahyog from './Components/AllSahyog'
import AdminLogin from './pages/AdminLogin'
import ProtectedRouteAdmin from './pages/ProtectedRouteAdmin'
import DashboardAdmin from './pages/DashboardAdmin'
import AllVyawastha from './Components/AllVyawastha'
import UpdatePass from './Components/UpdatePass'
import SelfDeclaration from './Components/SelfDeclaration'
import { useDispatch, useSelector  } from 'react-redux'
import { verifyAuth, scheduleAutoLogout } from "./redux/slices/authSlice";
import { logout } from './redux/slices/authSlice';
import logo from "./assets/images/Logo_Transparent_BG.png";

// Beautiful Loading Screen Component - ADDED ONLY
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center z-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center z-10 flex flex-col items-center">
        <div className="mb-8 relative">
           <img src={logo} width={200}></img>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Advocates Self Care Team - Uttar Pradesh
        </h1>
        
        <p className="text-xl text-blue-200 mb-8">
          आज का सहयोग कल का सहारा
        </p>
        
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        
        <p className="text-white mt-4 animate-pulse">Loading...</p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loginTime } = useSelector((state) => state.auth);
  
  // ADDED ONLY - Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [appReady, setAppReady] = useState(false);
  
  useEffect(() => {
    const startTime = Date.now();
    
    // Initialize app
    const initializeApp = async () => {
      try {
        await dispatch(verifyAuth()); // Check session on app load
        setAppReady(true);
      } catch (error) {
        console.error('Auth verification failed:', error);
        setAppReady(true); // Still mark as ready even if auth fails
      }
    };

    // Ensure minimum 2 seconds loading time
    setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    initializeApp();

    if (isAuthenticated && loginTime) {
      const timeElapsed = Date.now() - loginTime;

      if (timeElapsed < 2 * 60 * 60 * 1000) {
        // Schedule remaining logout time
        setTimeout(() => {
          dispatch(scheduleAutoLogout());
        }, 2 * 60 * 60 * 1000 - timeElapsed);
      } else {
        dispatch(logout());
      }
    }
  }, [dispatch, isAuthenticated, loginTime]);

  // Hide loading only when both conditions are met
  useEffect(() => {
    if (minTimeElapsed && appReady) {
      setIsLoading(false);
    }
  }, [minTimeElapsed, appReady]);
  
  // ADDED ONLY - Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div>
      <Navbar/>
      {/* Dynamic padding based on screen size */}
      <div className="pt-[215px] sm:pt-[215px] md:pt-[18vh]">
        <Menu/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/advocatesList' element={<TeachersList/>}></Route>
          <Route path='/sahyogList' element={<SahyogList/>}></Route>
          <Route path='/vyawasthaList' element={<VyawasthaList/>}></Route>
          <Route path='/niyamawali' element={<Niyamawali/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/adminLogin' element={<AdminLogin/>}></Route>
          <Route path='/admin/dashboard' element={<ProtectedRouteAdmin><DashboardAdmin/></ProtectedRouteAdmin>}></Route>
          <Route path='/advocates/dashboard' element={<ProtectedRouteAd><Dashboard/></ProtectedRouteAd>}>
            <Route index element={<DashboardComp/>}></Route>
            <Route path='profile' element={<Profile/>}></Route>
            <Route path='idcard' element={<IdCard/>}/>
            <Route path='runningSahyog' element={<RunningSahyogList/>}/>
            <Route path='allSahyog' element={<AllSahyog/>}/>
            <Route path='allVyawastha' element={<AllVyawastha/>}/>
            <Route path='updatePass' element={<UpdatePass/>}/>
            <Route path='selfDeclaration' element={<SelfDeclaration/>}/>
          </Route>
          <Route path='*' element={<div className='text-4xl text-blue-950 font-bold h-[60vh] text-center'>Error 404 - Page Not Found</div>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App