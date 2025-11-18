"use client";

import { FC, useState } from 'react';
import { toggleFavorite, existInFavorites} from '@/utils/localFavotites'

interface Props {
  pokemonId: number
}

const FavoriteButton: FC<Props> = ({ pokemonId }) => {
  const [isFavorite, setIsFavorite] = useState(existInFavorites(pokemonId));

  const onToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toggleFavorite(pokemonId)
  };

  return (

    <button
      className={`px-8 cursor-pointer py-3 rounded-full text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105
              ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
      onClick={onToggleFavorite}
    >
      {isFavorite ? (
        <>
          <i className="fas fa-heart mr-2"></i> Quitar de Favoritos
        </>
      ) : (
        <>
          <i className="far fa-heart mr-2"></i> Guardar en Favoritos
        </>
      )}
    </button>
  );
}

export default FavoriteButton
