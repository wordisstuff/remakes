import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Container from '../Container/Container';
import CSS from './Layout.module.css';
import { Toaster } from 'react-hot-toast';
import Footer from '../Footer/Footer';

const Layout = () => {
    return (
        <>
            <Suspense fallback={'...load'}>
                <header>
                    <Container className={CSS.container}>
                        <Header />
                    </Container>
                </header>
                <main>
                    <Container className={CSS.containerOutlet}>
                        <Outlet />
                    </Container>
                </main>
                <footer>
                    <Container className={CSS.container}>
                        <Footer />
                    </Container>
                </footer>
            </Suspense>
            <Toaster position="top-right" reverseOrder={true} />
        </>
    );
};

export default Layout;
