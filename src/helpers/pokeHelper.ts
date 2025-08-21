import type { PokemonType } from "../types";

export const typeColors: Record<PokemonType, string> = {
    fire: "from-orange-500 to-red-600",
    water: "from-blue-400 to-cyan-500",
    grass: "from-green-400 to-emerald-600",
    electric: "from-yellow-300 to-yellow-600",
    psychic: "from-pink-400 to-pink-700",
    ice: "from-cyan-300 to-blue-500",
    dragon: "from-indigo-500 to-purple-700",
    dark: "from-gray-700 to-black",
    fairy: "from-pink-300 to-pink-500",
    fighting: "from-red-700 to-orange-800",
    flying: "from-sky-300 to-sky-600",
    poison: "from-purple-500 to-purple-800",
    ground: "from-yellow-700 to-yellow-900",
    rock: "from-stone-400 to-stone-700",
    bug: "from-lime-500 to-green-700",
    ghost: "from-indigo-700 to-indigo-900",
    steel: "from-gray-400 to-gray-600",
    normal: "from-slate-300 to-slate-500",
};

export const isPokemonType = (value: string): value is PokemonType => {
    return value in typeColors;
};
