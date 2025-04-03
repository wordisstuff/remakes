import { useLocation } from 'react-router-dom';
import { icons } from '../../icons/index.js';
import CSS from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/song/selectors.js';
import { ImUser, ImUserCheck } from 'react-icons/im';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import UserBar from '../UserBar/UserBar.jsx';

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const cartArr = useSelector(selectCart);
    const activ = useLocation();
    return (
        <>
            <header className={CSS.header}>
                <div className={CSS.container}>
                    <div className={CSS.logo}>
                        <a href="/" className={CSS.logoLink}>
                            <img src="/MB.png" className={CSS.logoPic} />
                        </a>
                        <h1 className={CSS.title}>music barrel</h1>
                    </div>
                    <nav>
                        <ul>
                            {/* <li>
                                <a className={activ.pathname === '/'? CSS.activ:''} href="/">Remakes</a>
                            </li> */}
                            <li>
                                <a
                                    className={
                                        activ.pathname === '/cart'
                                            ? CSS.activ
                                            : ''
                                    }
                                    href="/cart"
                                >
                                    <svg className={CSS.iconCart}>
                                        <use
                                            xlinkHref={
                                                cartArr.length === 0
                                                    ? `${icons}#scart`
                                                    : `${icons}#sfcart`
                                            }
                                        />
                                    </svg>
                                </a>
                            </li>
                            {/* <li>
                                <a
                                    className={
                                        activ.pathname === '/signin' ||
                                        activ.pathname === '/signup'
                                            ? CSS.activ
                                            : ''
                                    }
                                    href="/signin"
                                >
                                    {!isLoggedIn ? (
                                        <ImUser className={CSS.iconCart} />
                                    ) : (
                                        <ImUserCheck className={CSS.iconCart} />
                                    )}
                                </a>
                            </li> */}
                            <UserBar />
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
