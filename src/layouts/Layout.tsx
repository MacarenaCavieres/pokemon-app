import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

function Layout() {
    return (
        <>
            <Header />
            <main className="flex justify-center py-16 mx-6 mb-24">
                <Outlet />
            </main>

            <Footer />

            <ToastContainer />
        </>
    );
}
export default Layout;
