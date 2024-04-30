import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/requireAuth.tsx';
import LoginPage from './pages/login/LoginPage.tsx';

function App() {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
                path='/adverts'
                element={
                    <RequireAuth>
                        <div className='container'>
                            <Outlet />
                        </div>
                    </RequireAuth>
                }
            >
                <Route
                    index
                    element={<RequireAuth>{'<AdvertsPage />'}</RequireAuth>}
                />
                <Route
                    path=':adId'
                    element={<RequireAuth>{' <AdvertPage />'}</RequireAuth>}
                />
                <Route
                    path='new'
                    element={<RequireAuth>{' <NewAdvertPage />'}</RequireAuth>}
                />
            </Route>
            <Route path='/' element={<Navigate to='/adverts' />} />
        </Routes>
    );
}

export default App;
