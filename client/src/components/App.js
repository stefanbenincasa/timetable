
import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GlobalProvider } from "../context/global_context"

import Timetable from "./Timetable"
import Login from "./Login"

import '../styles/App.css';

function App() {
  /* Logout sould be conditional shown */ 

  return (
    <Router>
      <GlobalProvider>
        <div className="p-5 m-auto container row d-flex flex-column align-items-center justify-content-center">
          <nav className="col-3 nav d-flex justify-content-end"><a className="nav-link text-decoration-underline" href="#">Logout</a></nav>
          <Routes>
            <Route path="/" element={<Timetable />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
