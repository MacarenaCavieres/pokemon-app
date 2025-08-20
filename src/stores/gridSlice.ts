import type { StateCreator } from "zustand";
import type { FilterInputs, Result } from "../types";
import { getGridPokemon } from "../services/PokesService";

const handleStorage = () => {
    const storage = localStorage.getItem("favorites");
    return storage ? JSON.parse(storage) : [];
};

export type GridType = {
    pokemonGroup: Result[];
    favoritesPokemons: Result[];
    pokemonsFiltered: Result[];
    fetchPokemonGrid: (page: number, limit: number) => Promise<void>;
    handleFavorites: (id: string) => void;
    handleFilters: (filters: FilterInputs) => void;
};

export const createGridSlice: StateCreator<GridType> = (set, get) => ({
    pokemonGroup: [],
    favoritesPokemons: handleStorage(),
    pokemonsFiltered: [],
    fetchPokemonGrid: async (page, limit) => {
        const data = await getGridPokemon(page, limit);
        set({
            pokemonGroup: data,
            pokemonsFiltered: data,
        });
    },
    handleFavorites: (id) => {
        if (get().favoritesPokemons.find((item) => item.id === id)) {
            set((state) => ({
                favoritesPokemons: state.favoritesPokemons.filter((item) => item.id !== id),
            }));
        } else {
            set((state) => ({
                favoritesPokemons: [
                    ...state.favoritesPokemons,
                    state.pokemonGroup.filter((item) => item.id === id)[0],
                ],
            }));
        }

        localStorage.setItem("favorites", JSON.stringify(get().favoritesPokemons));
    },
    handleFilters: (filters) => {
        set((state) => ({
            pokemonsFiltered: state.pokemonGroup.filter((item) => {
                const matchesSearch = filters.search
                    ? item.name.toLowerCase().includes(filters.search.toLowerCase().trim())
                    : true;
                const matchesFavorites =
                    filters.favorites === "favorites"
                        ? state.favoritesPokemons.some((pok) => pok.id === item.id)
                        : true;

                return matchesSearch && matchesFavorites;
            }),
        }));
    },
});
