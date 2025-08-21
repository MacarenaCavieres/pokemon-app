import { lazy, Suspense } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

const IndexPage = lazy(() => import("./views/IndexPage"));
const PokegridPage = lazy(() => import("./views/PokegridPage"));
const PokedexPage = lazy(() => import("./views/PokedexPage"));

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback="Loading...">
                                <IndexPage />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/pokegrid"
                        element={
                            <Suspense fallback="Loading...">
                                <PokegridPage />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/pokedex/:id"
                        element={
                            <Suspense fallback="Loading...">
                                <PokedexPage />
                            </Suspense>
                        }
                    ></Route>
                </Route>
            </Routes>
        </Router>
    );
}
export default AppRouter;
