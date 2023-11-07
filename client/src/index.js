import React from 'react';
import App from './components/App';
import ReactDOM from 'react-dom/client';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
