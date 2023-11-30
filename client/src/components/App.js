
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GlobalContext, GlobalProvider } from "../context/global_context"

import Timetable from "./Timetable"
import Login from "./Login"

import '../styles/App.css';

function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const { globalContext, setGlobalContext } = useContext(GlobalContext)

  useEffect(() => {
    async function authenticate() { 
      const response = await fetch(`http:///localhost:5000/authenticate`, { credentials: "include" })
      if(response.status === 200) {
        const data = await response.json()
        setGlobalContext(currentGlobalState => ({ ...currentGlobalState, session: { studentId: data.studentId}})) 
        setIsLoggedIn(true)
      }
    }

    authenticate()
  }, [])

    
  return (
    <div className="p-5 m-auto container row d-flex flex-column align-items-center justify-content-center">
    { isLoggedIn && <nav className="col-3 nav d-flex justify-content-end"><a className="nav-link text-decoration-underline" href="#">Logout</a></nav> }
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Timetable />} />
      </Routes>
    </div>
  )
}

export default App;
