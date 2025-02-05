import {useLocation } from 'react-router-dom';
import {icons} from '../../icons/index.js';
import CSS from './Header.module.css';
import {Arr} from '../../constants/consts.js'

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
                                <a  className={activ.pathname === '/cart'? CSS.activ:''} href="/cart">
                                <svg className={CSS.iconCart}>
                                    <use
                                        xlinkHref={
                                            Arr.length===0
                                                ? `${icons}#scart`
                                                : `${icons}#sfcart`
                                        }
                                    />
                                </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;