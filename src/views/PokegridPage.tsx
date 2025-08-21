import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import type { FilterInputs } from "../types";
import { useLocation } from "react-router-dom";

function PokegridPage() {
    const location = useLocation();
    const [page, setPage] = useState(location.state?.page ?? 0);
    const [isFiltering, setIsFiltering] = useState(false);
    const fetchPokemonGrid = useAppStore((state) => state.fetchPokemonGrid);
    const pokemonGrid = useAppStore((state) => state.pokemonGroup);
    const pokemons = useAppStore((state) => state.pokemonsFiltered);
    const handleFilters = useAppStore((state) => state.handleFilters);
    const pageSize = 30;
    const totalPages = Math.ceil(pokemons.length / pageSize);

    const isArrayFull = useMemo(() => pokemonGrid.length === pageSize, [pokemonGrid]);
    const pokemonsFiltered = useMemo(() => {
        if (isFiltering) {
            const start = page * pageSize;
            const end = start + pageSize;
            return pokemons.slice(start, end);
        } else {
            return pokemons;
        }
    }, [isFiltering, page, pokemons]);

    const handleChange = (filters: FilterInputs) => {
        handleFilters(filters);
        if (filters.search !== "" || filters.favorites === "favorites") {
            setIsFiltering(true);
            setPage(0);
        } else {
            setIsFiltering(false);
        }
    };

    useEffect(() => {
        if (!isFiltering) {
            fetchPokemonGrid(page, pageSize);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [isFiltering, page, fetchPokemonGrid]);

    return (
        <div>
            <Filters handleChange={handleChange} />

            {!isArrayFull ? (
                <Loader />
            ) : (
                <div className=" max-w-4xl flex flex-wrap justify-center gap-10">
                    {pokemonsFiltered.map((item) => (
                        <PokemonCard key={item.id} pokemon={item} currentPage={page} />
                    ))}
                </div>
            )}

            <Pagination
                page={page + 1}
                totalPages={isFiltering ? totalPages : 43}
                onPageChange={(newPage: number) => setPage(newPage - 1)}
            />
        </div>
    );
}
export default PokegridPage;
