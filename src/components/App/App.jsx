import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Cart from '../Cart/Cart';
import Home from '../Home/Home';
import SigninForm from '../SigninForm/SigninForm';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import RestrictedRoute from '../Routes/RestrictedRoute';
function App() {
    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/signin"
                        element={
                            <RestrictedRoute
                                redirectTo="/"
                                element={<SigninForm />}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <RestrictedRoute
                                redirectTo="/"
                                element={<SigninForm />}
                            />
                        }
                    />
                    <Route path="/cart" element={<Cart />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
