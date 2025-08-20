import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import Loader from "../components/Loader";
import PokemonGridCard from "../components/PokemonGridCard";
import Pagination from "../components/Pagination";

function PokegridPage() {
    const [page, setPage] = useState(0);
    const fetchPokemonGrid = useAppStore((state) => state.fetchPokemonGrid);
    const pokemonGrid = useAppStore((state) => state.pokemonGroup);

    const isArrayFull = useMemo(() => pokemonGrid.length === 30, [pokemonGrid]);

    useEffect(() => {
        fetchPokemonGrid(page, 30);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page, fetchPokemonGrid]);

    return (
        <div>
            {!isArrayFull ? (
                <Loader />
            ) : (
                <div className=" max-w-4xl flex flex-wrap justify-center gap-10">
                    {pokemonGrid.map((item) => (
                        <PokemonGridCard key={item.id} pokemon={item} />
                    ))}

                    <Pagination
                        page={page + 1}
                        totalPages={43}
                        onPageChange={(newPage: number) => setPage(newPage - 1)}
                    />
                </div>
            )}
        </div>
    );
}
export default PokegridPage;
