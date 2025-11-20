import { Pokemon } from '@/interfaces/pokemon-full'

export const getPokemonInfo = async (nameOrId: string) => {

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`, {
    // La caché en "force-cache" es adecuada para datos estáticos como los de la PokeAPI
    cache: "force-cache",
  });

  // Si la respuesta es OK (código 200-299), devolvemos el resultado
  const pokemon: Pokemon = await res.json();

  const poke = {
    id: pokemon.id,
    name: pokemon.name,
    sprites: pokemon.sprites,
    types: pokemon.types,
    abilities: pokemon.abilities,
    stats: pokemon.stats,
    height: pokemon.height,
    weight: pokemon.weight
  }

  return {
    ok: res.ok,
    status: res.status,
    data: poke
  }
}

