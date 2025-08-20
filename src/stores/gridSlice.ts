import type { StateCreator } from "zustand";
import type { Result } from "../types";
import { getGridPokemon } from "../services/PokesService";

export type GridType = {
    pokemonGroup: Result[];
    fetchPokemonGrid: (page: number, limit: number) => Promise<void>;
};

export const createGridSlice: StateCreator<GridType> = (set) => ({
    pokemonGroup: [],
    fetchPokemonGrid: async (page, limit) => {
        const data = await getGridPokemon(page, limit);
        set({
            pokemonGroup: data,
        });
    },
});
