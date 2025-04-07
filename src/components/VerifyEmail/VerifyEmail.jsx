import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setToken } from '../../redux/auth/slice.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

const VerifyEmail = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        if (token) dispatch(setToken(token));
    }, [token, dispatch]);

    useEffect(() => {
        if (isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return <div>load...</div>;
};

export default VerifyEmail;
