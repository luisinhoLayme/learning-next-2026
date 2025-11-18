import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pokemon Favorites",
  description: "All Pokemon Favorites",
  authors: {name: "Luisinho Dev"},
  keywords: "XXXX, pokemon, pokedex"
};

const FavoritesPage = () => {
  return (
    <>
      <h1>Favorites</h1>
    </>
  )
}

export default FavoritesPage
