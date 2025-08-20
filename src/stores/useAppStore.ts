import { create } from "zustand";
import { createRandomPokemonSlice, type RandomPokemonsType } from "./randomSlice";
import { devtools } from "zustand/middleware";
import { createGridSlice, type GridType } from "./gridSlice";

export const useAppStore = create<RandomPokemonsType & GridType>()(
    devtools((...a) => ({
        ...createRandomPokemonSlice(...a),
        ...createGridSlice(...a),
    }))
);
