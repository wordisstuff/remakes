import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Container from "../Container/Container";

const Layout = () => {
    return (
            <Suspense fallback={"...load"}>
                <header>
                <Container>
                    <Header/>
                </Container>
                </header>
                <main>
                    <Outlet />
                </main>
            </Suspense>
    );
};

export default Layout;