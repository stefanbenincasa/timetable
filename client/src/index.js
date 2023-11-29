import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

import App from './components/App';
import ReactDOM from 'react-dom/client';

import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GlobalContext, GlobalProvider } from "./context/global_context"


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
        <GlobalProvider>
          <App />
        </GlobalProvider>
    </Router>
  </React.StrictMode>
);
