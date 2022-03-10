import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";


import EditProfile from "./components/EditProfile/EditProfile";
import Login from './components/Login/Login'
import Profile from "./components/Profile/Profile";
import Register from './components/Register/Register'

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Register' element={<Register/>} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/Profile/:id' element={<Profile/>}/>
        <Route path='/Profile/:id/settings' element={<EditProfile/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
