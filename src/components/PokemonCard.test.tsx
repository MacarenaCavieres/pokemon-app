import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach, expect } from "vitest";
import PokemonCard from "./PokemonCard";
import { MemoryRouter } from "react-router-dom";
import { toast } from "react-toastify";
import * as store from "../stores/useAppStore";
import type { PokemonDetail } from "../types";

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("PokemonCard", () => {
    const mockPokemon = {
        id: "25",
        name: "pikachu",
        img: "pikachu.png",
    };

    const mockStore = {
        randomPokes: [],
        initialized: false,
        fetchInitialPokemons: vi.fn(),
        pokemonsFiltered: [],
        pokemonGroup: [],
        fetchPokemonGrid: vi.fn(),
        handleFilters: vi.fn(),
        pokemonDetail: {} as PokemonDetail,
        fetchPokemonDetail: vi.fn(),
        handleFavorites: vi.fn(),
        favoritesPokemons: [],
        fetchRandomPokemon: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(store, "useAppStore").mockImplementation((selector) => selector(mockStore));
    });

    it("renders pokemon info correctly", () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} />
            </MemoryRouter>
        );

        expect(screen.getByText(`#${mockPokemon.id}`)).toBeInTheDocument();
        expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
        expect(screen.getByAltText(`Pokemon ${mockPokemon.name}`)).toBeInTheDocument();
    });

    it("calls handleFavorites and shows toast on click", async () => {
        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} />
            </MemoryRouter>
        );

        const starButton = screen.getByTestId("favorite-btn");
        await userEvent.click(starButton);

        expect(mockStore.handleFavorites).toHaveBeenCalledWith(mockPokemon.id);
        expect(toast.success).toHaveBeenCalledWith("Pokemon added to favorites");
    });

    it("calls fetchRandomPokemon when 'Change pokemon' button is clicked on home", async () => {
        vi.spyOn(store, "useAppStore").mockImplementation((selector) => selector(mockStore));

        render(
            <MemoryRouter>
                <PokemonCard pokemon={mockPokemon} currentPage={1} />
            </MemoryRouter>
        );

        const changeButton = screen.getByText(/change pokemon/i);
        await userEvent.click(changeButton);

        expect(mockStore.fetchRandomPokemon).toHaveBeenCalled();
    });
});
