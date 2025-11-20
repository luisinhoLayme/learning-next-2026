"use client"

import { useEffect, useState } from 'react';
import { pokemons } from '@/utils/localFavotites'
import NoFavorites from '../no-favorites'
import FavoriteCardPokemon from './FavoriteCardPokemon'

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(pokemons())
  }, [])

  return (
    <>
      {
        !favoritePokemons.length
          ? <NoFavorites />
          : <section className="flex flex-wrap justify-center">
            {favoritePokemons.map(id => (
              <FavoriteCardPokemon key={id} id={id} />
            ))}
          </section>
      }
    </>
  )
}

export default Favorites
