import { useEffect, useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";

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
                Your initial team
            </h2>

            <section className="flex flex-wrap gap-5 justify-center items-center ">
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
