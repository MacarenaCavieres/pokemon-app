import type { StateCreator } from "zustand";
import type { PokemonDetail } from "../types";
import { randomPokesService } from "../services/PokesService";

export type RandomPokemonsType = {
    randomPokes: PokemonDetail[];
    initialized: boolean;
    fetchRandomPokemon: (id: string) => Promise<void>;
    fetchInitialPokemons: () => void;
};

export const createRandomPokemonSlice: StateCreator<RandomPokemonsType> = (set, get) => ({
    randomPokes: [],
    initialized: false,
    fetchRandomPokemon: async (id) => {
        const random = await randomPokesService(id);
        if (!random) return;
        set((state) => ({
            randomPokes: [...state.randomPokes, random],
        }));
    },
    fetchInitialPokemons: () => {
        if (get().initialized) return;

        for (let i = 0; i <= 5; i++) {
            const randomNum = (Math.random() * 1024 + 1).toFixed(0).toString();
            get().fetchRandomPokemon(randomNum);
        }
        set({
            initialized: true,
        });
    },
});
