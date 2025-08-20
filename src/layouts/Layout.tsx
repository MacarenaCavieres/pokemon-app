import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
    return (
        <>
            <Header />
            <main className="flex justify-center py-16 mx-6 mb-24">
                <Outlet />
            </main>
        </>
    );
}
export default Layout;
