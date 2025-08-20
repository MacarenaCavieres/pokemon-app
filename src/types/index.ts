import type z from "zod";
import type { Pokemon } from "../schemas/poke-schema";

export type PokemonDetail = z.infer<typeof Pokemon>;
