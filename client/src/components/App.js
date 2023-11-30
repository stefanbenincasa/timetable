
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate} from "react-router-dom";

import Timetable from "./Timetable"
import Login from "./Login"

import '../styles/App.css';

function App() {
  return (
  <div className="p-5 m-auto container row d-flex flex-column align-items-center justify-content-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Timetable /> } />
      </Routes>
    </div>
  )
}

export default App;
