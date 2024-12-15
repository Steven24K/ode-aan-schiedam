import { Outlet } from "react-router-dom"

export const PageLayout = () => {
    return <main className="main">
        <Outlet />
    </main>
}