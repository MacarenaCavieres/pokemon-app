import type { StateCreator } from "zustand";
import type { Result } from "../types";
import { getRandomPokes } from "../services/PokesService";

export type RandomPokemonsType = {
    randomPokes: Result[];
    initialized: boolean;
    fetchRandomPokemon: (id: string) => Promise<void>;
    fetchInitialPokemons: () => void;
};

export const createRandomPokemonSlice: StateCreator<RandomPokemonsType> = (set, get) => ({
    randomPokes: [],
    initialized: false,
    fetchRandomPokemon: async (id) => {
        const random = await getRandomPokes(id);
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
