import type { Result } from "../types";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useAppStore } from "../stores/useAppStore";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

type Props = {
    pokemon: Result;
};
function PokemonCard({ pokemon }: Props) {
    const handleFavorites = useAppStore((state) => state.handleFavorites);
    const favoritesPokemons = useAppStore((state) => state.favoritesPokemons);

    const isFavorite = useMemo(
        () => favoritesPokemons.find((item) => item.id === pokemon.id),
        [favoritesPokemons, pokemon.id]
    );

    const addOrRemoveFavorites = () => {
        handleFavorites(pokemon.id);
        if (!isFavorite) {
            toast.success("Pokemon added to favorites");
        } else {
            toast.error("Pokemon removed from favorites");
        }
    };

    return (
        <article className="border-2 border-black rounded-lg max-w-60">
            <span className="flex justify-end">
                {isFavorite ? (
                    <button onClick={addOrRemoveFavorites}>
                        <StarSolid className="h-8 w-8 text-yellow-400 cursor-pointer" />
                    </button>
                ) : (
                    <button onClick={addOrRemoveFavorites}>
                        <StarIcon className="h-8 w-8 text-yellow-400 cursor-pointer" />
                    </button>
                )}
            </span>

            <Link to={`/pokedex/${pokemon.id}`}>
                <div className="cursor-pointer mt-1 p-2">
                    <img className="w-full" src={pokemon.img} alt={`Pokemon ${pokemon.name}`} />
                    <div className="flex justify-between text-pink-800 py-3 px-4 font-bold text-2xl">
                        <p>{pokemon.id}</p>
                        <p>{pokemon.name}</p>
                    </div>
                </div>
            </Link>
        </article>
    );
}
export default PokemonCard;
