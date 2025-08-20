import { create } from "zustand";
import { createRandomPokemonSlice, type RandomPokemonsType } from "./randomSlice";
import { devtools } from "zustand/middleware";

export const useAppStore = create<RandomPokemonsType>()(
    devtools((...a) => ({
        ...createRandomPokemonSlice(...a),
    }))
);
