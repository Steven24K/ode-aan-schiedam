import { Outlet } from "react-router-dom"
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const PageLayout = () => {

    return <>
        <NavBar location="primary-menu" />

        <main className="main">
            <Outlet />
        </main>

        <Footer />
    </>
}