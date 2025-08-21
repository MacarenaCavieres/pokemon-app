import { useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

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

    const isPokedex = useMemo(() => pathname.split("/")[1] === "pokedex", [pathname]);
    const isHome = useMemo(() => pathname === "/", [pathname]);
    return (
        <>
            {!isPokedex && (
                <header className="relative h-96 flex justify-center items-center text-white">
                    <div className="absolute inset-0 bg-center bg-cover blur-sm bg-[url('./bg-header.jpg')]"></div>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <nav className="absolute top-14 right-6 z-20">
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
                        <NavLink
                            to="/pokegrid"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-yellow-300 text-xl mx-3"
                                    : "hover:text-yellow-300 mx-3 text-xl"
                            }
                        >
                            Pokemons
                        </NavLink>
                    </nav>
                    <div className="relative z-10 text-center w-full">
                        <h1 className="text-4xl">{titlePage}</h1>
                        {isHome && (
                            <Link to="/pokegrid">
                                <button
                                    type="button"
                                    className="mt-5 px-3 py-1 h-10 w-24 text-center rounded-lg uppercase bg-red-400 cursor-pointer font-bold text-yellow-100"
                                >
                                    Start
                                </button>
                            </Link>
                        )}
                    </div>
                </header>
            )}
        </>
    );
}
export default Header;
