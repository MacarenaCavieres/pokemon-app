import type z from "zod";
import type { Pokemon, PokemonGrid } from "../schemas/poke-schema";

export type PokemonDetail = z.infer<typeof Pokemon>;
export type PokemonGroup = z.infer<typeof PokemonGrid>;

export type Result = {
    id: string;
    name: string;
    img: string;
};

export type FilterInputs = {
    search: string;
    favorites: string;
};

export type PokemonType =
    | "fire"
    | "water"
    | "grass"
    | "electric"
    | "psychic"
    | "ice"
    | "dragon"
    | "dark"
    | "fairy"
    | "fighting"
    | "flying"
    | "poison"
    | "ground"
    | "rock"
    | "bug"
    | "ghost"
    | "steel"
    | "normal";
