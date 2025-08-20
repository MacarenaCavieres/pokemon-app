import type { PokemonDetail } from "../types";

type Props = {
    pokemon: PokemonDetail;
};

function PokemonCard({ pokemon }: Props) {
    return (
        <article className="border-2 border-black rounded-lg max-w-52">
            <img className="w-full" src={pokemon.sprites.other["official-artwork"].front_default} />

            <p>{pokemon.id}</p>
            <p>{pokemon.name}</p>
            <div className="flex gap-10">
                {pokemon.types.map((item) => (
                    <p key={item.type.name}>{item.type.name}</p>
                ))}
            </div>
            <div className="flex gap-32">
                <p>{pokemon.height}</p>
                <p>{pokemon.weight}</p>
            </div>
        </article>
    );
}
export default PokemonCard;
