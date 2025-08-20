import axios from "axios";
import { Pokemon } from "../schemas/poke-schema";

export async function randomPokesService(id: string) {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const result = Pokemon.safeParse(data);
        if (result.success) {
            return result.data;
        }
    } catch (error) {
        console.log(error);
    }
}
