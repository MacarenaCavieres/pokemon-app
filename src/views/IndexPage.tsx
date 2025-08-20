import { useEffect, useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import PokemonCard from "../components/PokemonCard";
import Loader from "../components/Loader";

function IndexPage() {
    const fetchInitialPokemons = useAppStore((state) => state.fetchInitialPokemons);
    const randomPokes = useAppStore((state) => state.randomPokes);
    const isArrayFull = useMemo(() => randomPokes.length === 6, [randomPokes]);

    useEffect(() => {
        fetchInitialPokemons();
    }, []);
    return (
        <div className="container max-w-3xl mx-auto">
            <h2 className="text-4xl text-center mb-16 font-bold underline text-pink-900">
                Tu equipo inicial
            </h2>

            <section className="flex flex-wrap gap-5 justify-center items-center">
                {!isArrayFull ? (
                    <Loader />
                ) : (
                    randomPokes.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
                )}
            </section>
        </div>
    );
}
export default IndexPage;
