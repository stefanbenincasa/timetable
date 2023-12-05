import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { getCookie } from '../services/secure';

import Timetable from "./Timetable"
import Login from "./Login"

import '../styles/App.css';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  const location = useLocation()

  useEffect(() => {
    const hasCookie = getCookie("connect.sid") ? true : false
    if(hasCookie) {
        setIsLoggedIn(true)
        return
    }
    
    setIsLoggedIn(false)
  }, [location])

  return (
  <div className="p-5 m-auto container row d-flex flex-column align-items-center justify-content-center">

      <Routes>
        <Route path="/login" element={ isLoggedIn ? <Navigate to="/" /> : <Login /> } />

        /* Private Routes */
        <Route path="/" element={isLoggedIn ? <Timetable /> : <Navigate to="/login" /> } />
      </Routes>

    </div>
  )
}

export default App;
