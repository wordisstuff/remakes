import {useLocation } from 'react-router-dom';
import CSS from './Header.module.css';

const Header = () => {
    const activ = useLocation();
    return (
        <>
            <header className={CSS.header}>
                <div className={CSS.container}>
                    <div className={CSS.logo}>
                        <a href="/">MB</a>
                    </div>
                    <nav>
                        <ul>
                            {/* <li>
                                <a className={activ.pathname === '/'? CSS.activ:''} href="/">Remakes</a>
                            </li> */}
                            <li>
                                <a  className={activ.pathname === '/cart'? CSS.activ:''} href="/cart">Cart</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;