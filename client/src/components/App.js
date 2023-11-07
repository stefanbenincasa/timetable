
import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GlobalProvider } from "../context/global_context"
import Timetable from "./Timetable"

import '../styles/App.css';

function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="container d-flex align-items-center justify-content-center">
          <Routes>
            <Route path="/" element={<Timetable />}>
            </Route>
          </Routes>
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
