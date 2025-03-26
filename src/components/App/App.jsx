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
import AddSong from '../AddSong/AddSong';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/auth/operation';
import { selectIsRefreshing } from '../../redux/auth/selectors';
function App() {
    const dispatch = useDispatch();
    const isRfreshing = useSelector(selectIsRefreshing);
    useEffect(() => {
        Aos.init();
    }, []);
    useEffect(() => {
        dispatch(currentUser());
    }, [dispatch]);
    if (isRfreshing) return null;
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
                    <Route path="/addsong" element={<AddSong />} />
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
