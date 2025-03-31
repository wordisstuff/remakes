import CSS from './Footer.module.css';
const Footer = () => {
    return (
        <>
            <footer className={CSS.header}>
                <div className={CSS.container}>
                    <div>
                        <p>© 2025 Hennadii Moholivets. All rights reserved.</p>
                        <a href="/license">License...</a>
                    </div>
                    <div className={CSS.logo}>
                        <a href="/" className={CSS.logoLink}>
                            <img src="/MB.png" className={CSS.logoPic} />
                        </a>
                        <h1>Music Barrel</h1>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
