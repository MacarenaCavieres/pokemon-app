import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import type { FilterInputs } from "../types";

function PokegridPage() {
    const [page, setPage] = useState(0);
    const fetchPokemonGrid = useAppStore((state) => state.fetchPokemonGrid);
    const pokemonGrid = useAppStore((state) => state.pokemonGroup);
    const pokemons = useAppStore((state) => state.pokemonsFiltered);
    const handleFilters = useAppStore((state) => state.handleFilters);

    const isArrayFull = useMemo(() => pokemonGrid.length === 30, [pokemonGrid]);

    const handleChange = (filters: FilterInputs) => {
        handleFilters(filters);
    };

    useEffect(() => {
        fetchPokemonGrid(page, 30);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page, fetchPokemonGrid]);

    return (
        <div>
            <Filters handleChange={handleChange} />

            {!isArrayFull ? (
                <Loader />
            ) : (
                <div className=" max-w-4xl flex flex-wrap justify-center gap-10">
                    {pokemons.map((item) => (
                        <PokemonCard key={item.id} pokemon={item} />
                    ))}
                </div>
            )}

            <Pagination
                page={page + 1}
                totalPages={43}
                onPageChange={(newPage: number) => setPage(newPage - 1)}
            />
        </div>
    );
}
export default PokegridPage;
