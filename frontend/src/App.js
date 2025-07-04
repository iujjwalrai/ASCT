import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Menu from "./Components/Menu";
import Home from "./pages/Home";
import About from "./pages/About";
import TeachersList from "./pages/AdvocatesList";
import SahyogList from "./pages/SahyogList";
import VyawasthaList from "./pages/VyawasthaList";
import Niyamawali from "./pages/Niyamawali";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardComp from "./Components/DashboardComp";
import Profile from "./Components/Profile";
import ProtectedRouteAd from "./pages/ProtectedRouteAd";
import IdCard from "./Components/IdCard";
import RunningSahyogList from "./Components/RunningSahyogList";
import AllSahyog from "./Components/AllSahyog";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";
import AllVyawastha from "./Components/AllVyawastha";
import UpdatePass from "./Components/UpdatePass";
import SelfDeclaration from "./Components/SelfDeclaration";
import { useDispatch, useSelector } from "react-redux";
import { verifyAuth, scheduleAutoLogout } from "./redux/slices/authSlice";
import { logout } from "./redux/slices/authSlice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./Components/Footer";
import Helpdesk from "./Components/Helpdesk";
import AdminHelpDesk from "./pages/AdminHelpDesk";
import QueryManagement from "./Components/QueryManagement";
import ASCTChatbot from "./pages/ASCTChatbot";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loginTime } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAuth()); // Check session on app load

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

  return (
    <div>
      <Navbar />
      {/* Dynamic padding based on screen size */}
      <div className="pt-[215px] sm:pt-[215px] md:pt-[18vh]">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/advocatesList" element={<TeachersList />}></Route>
          <Route path="/sahyogList" element={<SahyogList />}></Route>
          <Route path="/vyawasthaList" element={<VyawasthaList />}></Route>
          <Route path="/niyamawali" element={<Niyamawali />}></Route>
          <Route path="/chatbot" element={<ASCTChatbot/>}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/adminLogin" element={<AdminLogin />}></Route>
          <Route path="/admin/dashboard" element={<ProtectedRouteAdmin />}>
              <Route index element={<DashboardAdmin />} />
              <Route path="adminHelp" element={<AdminHelpDesk />} />
          </Route>
          <Route
            path="/advocates/dashboard"
            element={
              <ProtectedRouteAd>
                <Dashboard />
              </ProtectedRouteAd>
            }
          >
            <Route index element={<DashboardComp />}></Route>
            <Route path="helpdesk" element={<Helpdesk />}></Route>
            <Route path="query" element={<QueryManagement/>}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="idcard" element={<IdCard />} />
            <Route path="runningSahyog" element={<RunningSahyogList />} />
            <Route path="allSahyog" element={<AllSahyog />} />
            <Route path="allVyawastha" element={<AllVyawastha />} />
            <Route path="updatePass" element={<UpdatePass />} />
            <Route path="selfDeclaration" element={<SelfDeclaration />} />
          </Route>
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route
            path="*"
            element={
              <div>
                <div className="text-4xl text-blue-950 font-bold h-[60vh] text-center">
                  Error 404 - Page Not Found
                </div>
                <Footer />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
