import React from 'react'
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
const App = () => {


  return (
    <div className='overflow-hidden'>
      <Navbar/>
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
  )
}

export default App