import type { StateCreator } from "zustand";
import type { FilterInputs, Result } from "../types";
import { getByName, getGridPokemon } from "../services/PokesService";
import { type RandomPokemonsType } from "./randomSlice";

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

export const createGridSlice: StateCreator<GridType & RandomPokemonsType, [], [], GridType> = (set, get) => ({
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
                    state.pokemonGroup.find((item) => item.id === id)
                        ? state.pokemonGroup.filter((item) => item.id === id)[0]
                        : get().randomPokes.filter((item) => item.id === id)[0],
                ],
            }));
        }

        localStorage.setItem("favorites", JSON.stringify(get().favoritesPokemons));
    },
    handleFilters: async (filters) => {
        if (filters.search && !filters.favorites) {
            const pokemonByName = await getByName(filters.search.trim().toLowerCase());
            if (!pokemonByName) {
                set({ pokemonsFiltered: [] });
                return;
            }
            set({ pokemonsFiltered: [pokemonByName] });
            return;
        }

        if (filters.favorites === "favorites" && filters.search) {
            console.log("entra");
            set((state) => ({
                pokemonsFiltered: state.favoritesPokemons.filter((item) => {
                    const matchesSearch = filters.search
                        ? item.name.toLowerCase().includes(filters.search.toLowerCase().trim())
                        : true;
                    return matchesSearch;
                }),
            }));
            return;
        }

        if (filters.favorites === "favorites") {
            set((state) => ({
                pokemonsFiltered: state.favoritesPokemons,
            }));
            return;
        }

        if (filters.favorites !== "favorites") {
            set((state) => ({
                pokemonsFiltered: state.pokemonGroup.filter((item) => {
                    const matchesSearch = filters.search
                        ? item.name.toLowerCase().includes(filters.search.toLowerCase().trim())
                        : true;

                    return matchesSearch;
                }),
            }));
        }
    },
});
