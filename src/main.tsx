import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import LogContextProvider from './context/authcontext/authcontext.tsx';
import { setAuthorizationHeader } from './utils/api/client.ts';
const accessToken = localStorage.getItem('auth');
if (accessToken) {
  
    setAuthorizationHeader(accessToken);
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LogContextProvider defaultState={!!accessToken}>
    <App />
      </LogContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
