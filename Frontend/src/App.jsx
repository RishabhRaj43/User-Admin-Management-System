import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Aliens from "./Components/AliensPage/Aliens";
import UserSignup from "./Components/User/UserSignup";
import UserLogin from "./Components/User/UserLogin";
import AdminSignup from "./Components/Admin/AdminSignup";
import AdminLogin from "./Components/Admin/AdminLogin";
import Home from "./Components/Home/Home";
import Favourites from "./Components/Favourites/Favourites";
import { Toaster } from "react-hot-toast";
import PutAliens from "./Components/AliensPage/PutAliens";
import GetUsers from "./Components/Admin/GetUsers";

const App = () => {
  return (
    <div className="flex h-screen">
      <Toaster />
      <Navbar />
      <div className="items-center ml-[15%] w-full h-full p-5 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aliens" element={<Aliens />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/putaliens" element={<PutAliens />} />
          <Route path="/getallusers" element={<GetUsers />} />

          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route
            path="/adminsignup"
            element={
              <div className="h-full" >
                <AdminSignup />
              </div>
            }
          />
          <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
