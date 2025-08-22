import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
    it("muestra el título 'Welcome to the Pokemon App' en la ruta '/'", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: /welcome to the pokemon app/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    });

    it("muestra el título 'Pokemons' en la ruta '/pokegrid'", () => {
        render(
            <MemoryRouter initialEntries={["/pokegrid"]}>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: /pokemons/i })).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: /start/i })).not.toBeInTheDocument();
    });

    it("que el header no se muestre en la ruta '/pokedex/25'", () => {
        render(
            <MemoryRouter initialEntries={["/pokedex/25"]}>
                <Header />
            </MemoryRouter>
        );

        expect(screen.queryByRole("banner")).not.toBeInTheDocument();
        expect(screen.queryByRole("heading", { name: /pokedex/i })).not.toBeInTheDocument();
    });

    it("muestra los links de navegación", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Header />
            </MemoryRouter>
        );

        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /pokemons/i })).toBeInTheDocument();
    });

    it("redirige a /pokegrid al hacer click en Start", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/pokegrid" element={<h2>Pokemons Page</h2>} />
                </Routes>
            </MemoryRouter>
        );

        const startButton = screen.getByRole("button", { name: /start/i });
        expect(startButton).toBeInTheDocument();

        await user.click(startButton);
        expect(screen.getByRole("heading", { name: /pokemons page/i })).toBeInTheDocument();
    });
});
