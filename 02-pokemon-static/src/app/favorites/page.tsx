import { Metadata } from 'next';
import Favorites from '@/components/pokemon/Favorites'

export const metadata: Metadata = {
  title: "Pokemon Favorites",
  description: "All Pokemon Favorites",
  authors: {name: "Luisinho Dev"},
  keywords: "XXXX, pokemon, pokedex"
};

const FavoritesPage = () => {
  return <Favorites />
}

export default FavoritesPage
