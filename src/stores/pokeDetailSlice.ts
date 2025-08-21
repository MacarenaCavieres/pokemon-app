import type { StateCreator } from "zustand";
import type { PokemonDetail } from "../types";
import { getById } from "../services/PokesService";

export type PokeDetailType = {
    pokemonDetail: PokemonDetail;
    fetchPokemonDetail: (id: string) => Promise<void>;
};

export const createPokeDetailSlice: StateCreator<PokeDetailType> = (set) => ({
    pokemonDetail: {} as PokemonDetail,
    fetchPokemonDetail: async (id) => {
        const pokemon = await getById(id);
        set({
            pokemonDetail: pokemon,
        });
    },
});
