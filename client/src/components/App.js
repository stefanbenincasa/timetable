
import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GlobalProvider } from "../context/global_context"

import '../styles/App.css';

function Home() {
  return <h2>Home</h2>;
}

function App() {
  return (
    <Router>
      <GlobalProvider>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
