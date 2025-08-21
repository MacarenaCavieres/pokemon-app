import { create } from "zustand";
import { createRandomPokemonSlice, type RandomPokemonsType } from "./randomSlice";
import { devtools } from "zustand/middleware";
import { createGridSlice, type GridType } from "./gridSlice";
import { createPokeDetailSlice, type PokeDetailType } from "./pokeDetailSlice";

export const useAppStore = create<RandomPokemonsType & GridType & PokeDetailType>()(
    devtools((...a) => ({
        ...createRandomPokemonSlice(...a),
        ...createGridSlice(...a),
        ...createPokeDetailSlice(...a),
    }))
);
