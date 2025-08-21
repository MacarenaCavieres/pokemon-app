import axios from "axios";
import { Pokemon, PokemonGrid } from "../schemas/poke-schema";

export async function getRandomPokes(id: string) {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const result = Pokemon.safeParse(data);
        if (result.success) {
            const restructure = {
                id,
                name: result.data?.name,
                img: result.data?.sprites.other["official-artwork"].front_default,
                favorite: false,
            };
            return restructure;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getGridPokemon(page: number, limit: number) {
    try {
        const offset = page * limit;
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const result = PokemonGrid.safeParse(data);
        const restructure = result.data?.results.map((item) => {
            const id = item.url.split("/")[item.url.split("/").length - 2];
            return {
                id,
                name: item.name,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                favorite: false,
            };
        });

        if (result.success) {
            return restructure;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getById(id: string) {
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
