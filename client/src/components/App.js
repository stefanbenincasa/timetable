import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie, deleteCookie } from '../services/secure';

import Timetable from "./Timetable"
import Loader from "./Loader";
import Login from "./Login"

import '../styles/App.css';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(getCookie("connect.sid")) {
        setIsLoggedIn(true)
        return
    }
    
    setIsLoggedIn(false)
  }, [location])

  const handleLogout = async function(e) {
    try { 
      const response = await fetch(`http://localhost:5000/logout`, { credentials: "include" })
      deleteCookie("connect.sid")
      navigate("/login")
    }
    catch (err) {
      alert("Error while logging-out!")
      console.log(err)
    }
  }

  return (
  <div className="p-5 m-auto container row d-flex flex-column align-items-center justify-content-center">
      { isLoggedIn && <nav className="w-auto p-0"><button className="btn btn-secondary" style={{fontSize: "x-small"}} onClick={handleLogout}>Logout</button></nav> }

      <Routes>
        <Route path="/login" element={ isLoggedIn === false ? <Login /> : <Navigate to="/" /> } />

        /* Private Routes */
        <Route path="/" element={isLoggedIn === true ? <Timetable handleLogout={handleLogout} /> : <Navigate to="/login" /> } />
      </Routes>

    </div>
  )
}

export default App;
