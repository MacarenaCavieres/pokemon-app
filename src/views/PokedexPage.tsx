import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function PokedexPage() {
    const { id } = useParams();
    const fetchPokemonDetail = useAppStore((state) => state.fetchPokemonDetail);
    const pokemonDetail = useAppStore((state) => state.pokemonDetail);

    useEffect(() => {
        console.log(id);
        if (!id) return;
        fetchPokemonDetail(id);
    }, []);

    return (
        <section className="flex flex-col">
            <div>
                <Link to="/pokegrid">
                    <button
                        type="button"
                        className="cursor-pointer flex mb-7 bg-red-400 rounded-lg p-2 text-yellow-200"
                    >
                        <ArrowLeftCircleIcon className="h-8 w-8" />{" "}
                        <span className="uppercase text-2xl">Back</span>
                    </button>
                </Link>
            </div>
            <div className="relative h-[600px] w-[600px] flex justify-center items-center text-white">
                <div
                    className="absolute inset-0 bg-center bg-cover blur-sm"
                    style={{
                        backgroundImage: `url(${pokemonDetail.sprites?.other["official-artwork"].front_default})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

                <div className="relative z-10 text-center w-full">
                    <p>{pokemonDetail.id}</p>
                    <p>{pokemonDetail.name}</p>
                    {pokemonDetail.types?.map((item) => (
                        <p key={item.type.name}>{item.type.name}</p>
                    ))}
                    <p>{pokemonDetail.height / 10}m</p>
                    <p>{pokemonDetail.weight / 10}Kg</p>
                </div>
            </div>
        </section>
    );
}
export default PokedexPage;
