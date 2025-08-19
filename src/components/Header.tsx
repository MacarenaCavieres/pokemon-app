import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();
    const titlePage = useMemo(
        () =>
            pathname === "/"
                ? "Welcome to the Pokemon App"
                : pathname === "/pokegrid"
                ? "Pokemons"
                : "Pokedex",
        [pathname]
    );
    return (
        <header className="relative h-96 flex justify-center items-center text-white">
            <div className="absolute inset-0 bg-center bg-cover blur-sm bg-[url('./bg-header.jpg')]"></div>
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 text-center w-full">
                <div className="absolute top-20 right-6">
                    <nav>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-300 text-xl mx-3"
                                    : "hover:text-yellow-300 mx-3 text-xl"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink to="/pokegrid" className={({ isActive }) => (isActive ? "underline" : "")}>
                            Pokemons
                        </NavLink>
                        <NavLink to="/pokedex" className={({ isActive }) => (isActive ? "underline" : "")}>
                            Pokedex
                        </NavLink>
                    </nav>
                </div>
                <h1 className="text-4xl">{titlePage}</h1>
                <button
                    type="button"
                    className="mt-5 px-3 py-1 h-10 w-24 text-center rounded-lg uppercase bg-red-400 cursor-pointer font-bold text-yellow-100"
                >
                    Start
                </button>
            </div>
        </header>
    );
}
export default Header;
