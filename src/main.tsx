import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import LogContextProvider from './context/authcontext/authcontext.tsx';
import { setAuthorizationHeader } from './utils/api/client.ts';
import { BrowserRouter } from 'react-router-dom';
import FilterContextProvider from './context/filterContext/filterContext.tsx';
import ConfirmContextProvider from './context/confirmationContext/confirmationContext.tsx';

const accessToken = localStorage.getItem('auth');
if (accessToken) {
    setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfirmContextProvider
                defaultConfirmState={false}
                defaulthiddenState={true}
            >
                <LogContextProvider defaultState={!!accessToken}>
                    <FilterContextProvider
                        children={<App />}
                        filters={{
                            search: '',
                            tags: [],
                            buysell: 'all',
                            price: 0,
                        }}
                    ></FilterContextProvider>
                </LogContextProvider>
            </ConfirmContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
