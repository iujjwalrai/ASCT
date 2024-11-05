import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Menu from './Components/Menu'
import Home from './pages/Home'
import About from './pages/About'
import TeachersList from './pages/TeachersList'
import SahyogList from './pages/SahyogList'
import VyawasthaList from './pages/VyawasthaList'
import Niyamawali from './pages/Niyamawali'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
const App = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/teachersList' element={<TeachersList/>}></Route>
        <Route path='/sahyogList' element={<SahyogList/>}></Route>
        <Route path='/vyawasthaList' element={<VyawasthaList/>}></Route>
        <Route path='/niyamawali' element={<Niyamawali/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </div>
  )
}

export default App