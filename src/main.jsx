import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ReactGA from 'react-ga4';

ReactGA.initialize(import.meta.env.VITE_APP_GA);

ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
