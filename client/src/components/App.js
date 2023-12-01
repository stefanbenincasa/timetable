
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { isAuthenticated } from '../services/secure';

import Timetable from "./Timetable"
import Login from "./Login"

import '../styles/App.css';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null)

  useEffect(() => {
    async function authenticate() {
      const authenticated = await isAuthenticated()
      setIsLoggedIn(authenticated.result)
    }

    authenticate()
  }, [setIsLoggedIn])
  
  return (
  <div className="p-5 m-auto container row d-flex flex-column align-items-center justify-content-center">
      { isLoggedIn && <nav style={{ padding: "21px", position: "fixed", top: "0", right: "0", textAlign: "right" }}><a href="#">Logout</a></nav> }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Timetable />} />
      </Routes>
    </div>
  )
}

export default App;
