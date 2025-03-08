import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Cart from '../Cart/Cart';
import Home from '../Home/Home';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import RestrictedRoute from '../Routes/RestrictedRoute';
import AuthPage from '../../pages/AuthPage';
import Signin from '../SignForm/Signin';
import Signup from '../SignForm/Signup';
function App() {
    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <div
            style={{
                backgroundImage: "url('/bg2.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/signin"
                        element={
                            <RestrictedRoute
                                redirectTo="/"
                                element={
                                    <AuthPage>
                                        <Signin />
                                    </AuthPage>
                                }
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <RestrictedRoute
                                redirectTo="/"
                                element={
                                    <AuthPage title={true}>
                                        <Signup />
                                    </AuthPage>
                                }
                            />
                        }
                    />
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
