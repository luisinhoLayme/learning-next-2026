import pokeApi from "@/api/pokeApi";
import { Metadata } from "next";
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list'
import PokemonCard from "@/components/pokemon/PokemonCard";

export const metadata: Metadata = {
  title: "Pokemon List",
  description: "Pokedex Go, pokemon list.",
  authors: { name: "Luisinho Dev" },
  keywords: "pokemon list, pokemon, pokedex"
};

// export const dynamic = 'force-dynamic';
// export const revalidate = false; // ✅ 100% estática: no revalida nunca

async function getPokemons(): Promise<SmallPokemon[]> {
  // const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=50')

  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10", {
    // cache: 'force-cache' => comportamiento estático como getStaticProps
    cache: "force-cache",
  });
  const data: PokemonListResponse = await res.json();

  const pokemons = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1
      }.svg`
  }))

  return pokemons
}

export default async function Home() {
  const pokemons = await getPokemons()

  return (
    <section className="flex flex-wrap justify-center">
      {
        pokemons?.map((poke) => (
          <PokemonCard
            key={poke.id}
            pokemon={poke}
          />
        ))
      }
    </section>

  );
}


