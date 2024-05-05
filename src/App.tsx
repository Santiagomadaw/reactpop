import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/requireAuth.tsx';
import Confirmator from './components/shared/Confirmator.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import { Suspense, lazy } from 'react';
import { Loading } from './components/shared/Loading.tsx';
const LoginPage = lazy(() => import('./pages/login/LoginPage.tsx'));
const AdvertsPage = lazy(() => import('./pages/AdvertsPage/advertsPage.tsx'));
const NewAdvertPage = lazy(() => import('./pages/NewAdvertPage/NewAdvertPage.tsx'));
const AdvertPage = lazy(() => import('./pages/AdvertPage/advertPage.tsx'));

function App() {
    return (
        
        <Suspense>
            <>
                <Confirmator />
                <Routes>
                    <Route
                        path='/login'
                        element={
                            <Suspense fallback={<Loading />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
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
                            element={
                                <RequireAuth>
                                    <Suspense fallback={<Loading />}>
                                        <AdvertsPage />
                                    </Suspense>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path=':adId'
                            element={
                                <RequireAuth>
                                    <Suspense fallback={<Loading />}>
                                        <AdvertPage />
                                    </Suspense>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path='new'
                            element={
                                <RequireAuth>
                                    <Suspense fallback={<Loading />}>
                                        <NewAdvertPage />
                                    </Suspense>
                                </RequireAuth>
                            }
                        />
                    </Route>
                    <Route
                        path='/'
                        element={<Navigate to='/adverts' />}
                    />
                    <Route
                        path='/404'
                        element={<NotFoundPage />}
                    />
                    <Route
                        path='*'
                        element={<Navigate to='/404' />}
                    />
                </Routes>
            </>
        </Suspense>
    );
}

export default App;
