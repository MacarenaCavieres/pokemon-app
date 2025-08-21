import type { Result } from "../types";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useAppStore } from "../stores/useAppStore";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

type Props = {
    pokemon: Result;
    currentPage?: number;
};
function PokemonCard({ pokemon, currentPage }: Props) {
    const handleFavorites = useAppStore((state) => state.handleFavorites);
    const favoritesPokemons = useAppStore((state) => state.favoritesPokemons);
    const fetchRandomPokemon = useAppStore((state) => state.fetchRandomPokemon);
    const { pathname } = useLocation();
    const location = useLocation();

    const isHome = useMemo(() => pathname === "/", [pathname]);

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

    const handleChangePokemon = () => {
        const randomNum = (Math.random() * 1024 + 1).toFixed(0).toString();
        fetchRandomPokemon(randomNum, pokemon.id);
    };

    return (
        <>
            <article
                className="
            relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-tr from-[#FCD77F] to-[#2E99B0]
            transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
            w-60 h-auto
  "
            >
                <span className="absolute top-2 right-2 z-10">
                    {isFavorite ? (
                        <button onClick={addOrRemoveFavorites}>
                            <StarSolid className="h-8 w-8 text-yellow-400 drop-shadow-md" />
                        </button>
                    ) : (
                        <button onClick={addOrRemoveFavorites}>
                            <StarIcon className="h-8 w-8 text-yellow-400 drop-shadow-md" />
                        </button>
                    )}
                </span>

                <Link
                    to={`/pokedex/${pokemon.id}`}
                    state={{ from: { pathname: location.pathname, page: currentPage } }}
                >
                    <div className="cursor-pointer text-center">
                        <div className="p-4 flex justify-center items-center">
                            <img
                                className="w-48 h-48 object-contain transition-transform duration-300 hover:scale-110"
                                src={pokemon.img}
                                alt={`Pokemon ${pokemon.name}`}
                            />
                        </div>

                        <div className="bg-[#FFF5CD]/70 backdrop-blur-sm px-4 py-2 rounded-t-2xl font-bold text-2xl">
                            <p className="text-gray-700">#{pokemon.id}</p>
                            <p className="text-pink-800 text-xl capitalize">{pokemon.name}</p>
                        </div>
                    </div>
                </Link>
                {isHome && (
                    <button
                        className="cursor-pointer flex bg-black/40 rounded-lg p-2 text-yellow-200 w-full justify-center"
                        onClick={handleChangePokemon}
                    >
                        Change pokemon
                    </button>
                )}
            </article>
        </>
    );
}
export default PokemonCard;
