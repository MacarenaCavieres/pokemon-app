import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { isPokemonType, typeColors } from "../helpers/pokeHelper";
import type { PokemonType } from "../types";

function PokedexPage() {
    const { id } = useParams();
    const fetchPokemonDetail = useAppStore((state) => state.fetchPokemonDetail);
    const pokemonDetail = useAppStore((state) => state.pokemonDetail);
    const location = useLocation();

    useEffect(() => {
        if (!id) return;
        fetchPokemonDetail(id);
    }, []);

    const rawType = pokemonDetail.types?.[0]?.type.name ?? "normal";
    const mainType: PokemonType = isPokemonType(rawType) ? rawType : "normal";
    const bgGradient = typeColors[mainType];

    const navigate = useNavigate();

    const handleBack = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(-1);
        }
    };

    return (
        <section
            className={`flex flex-col min-h-screen items-center justify-center text-white bg-gradient-to-tr ${bgGradient} p-6 rounded-xl`}
        >
            <div>
                <button
                    type="button"
                    className="cursor-pointer flex mb-7 bg-black/40 rounded-lg p-2 text-yellow-200"
                    onClick={handleBack}
                >
                    <ArrowLeftCircleIcon className="h-8 w-8" />
                    <span className="uppercase text-2xl">Back</span>
                </button>
            </div>

            <div className="relative z-10 text-center w-full max-w-md p-6 bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl">
                <img
                    src={pokemonDetail.sprites?.other["official-artwork"].front_default}
                    alt={`Pokemon ${pokemonDetail.name}`}
                    className="animate-spin-in mx-auto drop-shadow-lg"
                />
                <div className="mt-4">
                    <p className="text-2xl font-bold">#{pokemonDetail.id}</p>
                    <p className="text-3xl font-extrabold capitalize">{pokemonDetail.name}</p>

                    <div className="flex justify-center gap-2 mt-2">
                        {pokemonDetail.types?.map((item) => (
                            <span
                                key={item.type.name}
                                className="px-3 py-1 rounded-full bg-black/30 text-white text-sm font-bold uppercase"
                            >
                                {item.type.name}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6 text-lg">
                        <p>⚖️ {pokemonDetail.weight / 10} Kg</p>
                        <p>📏 {pokemonDetail.height / 10} m</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default PokedexPage;
