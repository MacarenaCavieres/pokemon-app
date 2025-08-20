import type { Result } from "../types";

type Props = {
    pokemon: Result;
};
function PokemonGridCard({ pokemon }: Props) {
    return (
        <article className="border-2 border-black rounded-lg max-w-60">
            <img className="w-full" src={pokemon.img} alt={`Pokemon ${pokemon.name}`} />
            <div className="flex justify-between text-pink-800 py-3 px-4 font-bold text-2xl">
                <p>{pokemon.id}</p>
                <p>{pokemon.name}</p>
            </div>
        </article>
    );
}
export default PokemonGridCard;
