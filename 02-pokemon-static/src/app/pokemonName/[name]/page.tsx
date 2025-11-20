import Image from 'next/image';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import FavoriteButton from '@/components/pokemon/FavoriteButton'
import { PokemonListResponse } from '@/interfaces/pokemon-list';
import { getPokemonInfo } from '@/utils/getPokemonInfo'

interface Props {
  params: Promise<{ name: string }>
}

// 1. Define las props que recibe generateMetadata
type PropsMeta = {
  // params: { id: string }; // Contiene el ID del Pokémon de la ruta [id]
  params: Promise<{ name: string }>
  searchParams: { [key: string]: string | string[] | undefined }; // Parámetros de consulta
};

export async function generateStaticParams() {
  // const limit = 10
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`)
  const data: PokemonListResponse = await res.json()

  const pokemonsName: string[] = data.results.map(pokemon => pokemon.name)

  // console.log(pokemonsName.map(name => ({name})))
  return pokemonsName.map(name => ({name}))
}

// async function getPokemon(id: string) {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
//     cache: "force-cache",
//   });
//   const pokemon: Pokemon = await res.json()
//
//   return pokemon
// }
// Define el número máximo de intentos que quieres realizar
const MAX_RETRIES = 4;

async function getPokemon(name: string) {
  // Bucle para intentar hasta MAX_RETRIES veces
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Intentando obtener Pokémon ${name}... (Intento ${attempt}/${MAX_RETRIES})`);

      const {ok, status, data} = await getPokemonInfo(name)

      if (ok) {
        return data
      }

      // Si la respuesta no es OK (ej. 404 Not Found), lanzamos un error inmediatamente
      // Esto detiene el bucle de reintento, ya que no es un error temporal.
      throw new Error(`Error HTTP: ${status} al obtener el Pokémon ${name}`);

    } catch (error: any) {
      // Manejamos el error (como el 'fetch failed' o 'ETIMEDOUT')
      console.error(`Fallo en el Intento ${attempt}:`, error.message);

      // Si es el último intento, lanzamos el error para que sea manejado por la función que llama (PokemonPage)
      if (attempt === MAX_RETRIES) {
        throw new Error(`Fallo definitivo al obtener el Pokémon ${name} después de ${MAX_RETRIES} intentos.`);
      }

      // --- 💡 Lógica de Retroceso Exponencial ---
      // Calcula el tiempo de espera: 2^(attempt - 1) segundos, añadiendo algo de aleatoriedad (Jitter)
      const baseDelay = 1000; // 1 segundo en milisegundos
      const exponent = attempt - 1;

      // Cálculo: (1000 * 2^0) = 1s, (1000 * 2^1) = 2s, (1000 * 2^2) = 4s, etc.
      // Se añade Math.random() para evitar que todas las peticiones reintenten a la vez (Jitter)
      const delay = (baseDelay * Math.pow(2, exponent)) + (Math.random() * 500);

      console.log(`Esperando ${Math.round(delay / 1000)} segundos antes del próximo intento...`);

      // Espera el tiempo calculado antes del siguiente reintento
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 2. Exporta la función asíncrona generateMetadata
export async function generateMetadata(
  { params }: PropsMeta,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { name } = await params;
  console.log(name)
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    return {
      title: 'Pokémon no encontrado',
    };
  }

  // Define el título base, la descripción, y la imagen (Open Graph)
  const title = `¡${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}! - Pokédex`;
  const description = `Conoce todo sobre el Pokémon ${pokemon.name}. Tipo(s): ${pokemon.types.map((t: any) => t.type.name).join(', ')}.`;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: imageUrl,
          width: 500,
          height: 500,
          alt: pokemon.name,
        },
      ],
    },
    // Añade más campos de metadatos si es necesario (Twitter, keywords, etc.)
  };
}

// Componente principal de la página de detalles
export default async function PokemonPage({ params }: Props) {

  const { name } = await params
  const pokemon = await getPokemon(name)

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
  //       <p className="text-2xl animate-pulse">Cargando Pokémon...</p>
  //     </div>
  //   );
  // }
  if (!pokemon) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
        <p className="text-2xl">Pokémon no encontrado.</p>
        <Link href="/" className="ml-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
          Volver al Inicio
        </Link>
      </div>
    );
  }


  // --- Renderizado del Pokémon ---
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const officialArtwork = pokemon.sprites.other?.['official-artwork'].front_default;

  // Filtrar los sprites para mostrar solo los disponibles y relevantes
  const availableSprites = [
    { name: "Normal", url: pokemon.sprites.front_default },
    { name: "Shiny", url: pokemon.sprites.front_shiny },
    { name: "Espalda", url: pokemon.sprites.back_default },
    { name: "Espalda Shiny", url: pokemon.sprites.back_shiny },
    // Puedes añadir más sprites de otras versiones si la interfaz Sprites los incluye
    // Ejemplo de sprite animado de Gen V (si lo quieres y tu interfaz lo soporta):
    // { name: "Animado", url: pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default }
  ].filter(sprite => sprite.url); // Filtra los que tengan URL (no son null)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'grass': return 'bg-green-500';
      case 'fire': return 'bg-red-500';
      case 'water': return 'bg-blue-500';
      case 'bug': return 'bg-lime-500';
      case 'normal': return 'bg-gray-400';
      case 'poison': return 'bg-purple-500';
      case 'electric': return 'bg-yellow-400';
      case 'ground': return 'bg-amber-700';
      case 'fairy': return 'bg-pink-400';
      case 'fighting': return 'bg-orange-700';
      case 'psychic': return 'bg-fuchsia-500';
      case 'rock': return 'bg-stone-500';
      case 'ghost': return 'bg-indigo-700';
      case 'ice': return 'bg-cyan-300';
      case 'dragon': return 'bg-indigo-800';
      case 'steel': return 'bg-slate-500';
      case 'dark': return 'bg-gray-700';
      case 'flying': return 'bg-indigo-400';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row items-center relative transform transition-all duration-500 hover:scale-105">

        {/* Botón de Volver */}
        <Link href="/" className="absolute top-6 left-6 text-gray-600 hover:text-blue-600 transition-colors text-lg font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Volver
        </Link>

        {/* Sección de Imagen y Nombre */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-4">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2 text-center">
            {formattedName} <span className="text-gray-500 text-3xl">#{pokemon.id}</span>
          </h1>
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 mb-6">
            <Image
              src={officialArtwork || '' + pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              style={{ objectFit: "contain" }}
              priority // Carga la imagen principal con alta prioridad
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="drop-shadow-2xl"
            />
          </div>

          {/* Botón de Favoritos */}
          <FavoriteButton pokemonId={pokemon.id} />
          {/* --- Nueva Sección de Sprites --- */}
          {availableSprites.length > 0 && (
            <div className="mt-8 w-full max-w-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b-2 border-purple-300 pb-2">Sprites</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 justify-items-center">
                {availableSprites.map((sprite, index) => (
                  <div key={index} className="flex flex-col items-center bg-gray-100 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow">
                    <Image
                      src={sprite.url!} // '!' asegura a TS que url no es null aquí debido al .filter
                      alt={`${pokemon.name} ${sprite.name} sprite`}
                      width={96} // Tamaño estándar para sprites de Pokémon
                      height={96}
                      className="object-contain"
                    />
                    <span className="text-sm font-medium text-gray-600 mt-1">{sprite.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* --- Fin de Nueva Sección de Sprites --- */}
        </div>

        {/* Sección de Detalles y Estadísticas */}
        <div className="lg:w-1/2 p-4 lg:pl-8 text-gray-700">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-300 pb-2">Información Básica</h2>
          <div className="grid grid-cols-2 gap-4 text-lg mb-6">
            <p><strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m</p>
            <p><strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>

          <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-300 pb-2">Tipos</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {pokemon.types.map(typeInfo => (
              <span
                key={typeInfo.type.name}
                className={`px-5 py-2 rounded-full text-white text-lg font-semibold shadow-md ${getTypeColor(typeInfo.type.name)}`}
              >
                {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
              </span>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-300 pb-2">Habilidades</h2>
          <ul className="list-disc list-inside text-lg mb-6">
            {pokemon.abilities.map(abilityInfo => (
              <li key={abilityInfo.ability?.name}>
                {abilityInfo.ability?.name}
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-bold mb-4 border-b-2 border-purple-300 pb-2">Estadísticas Base</h2>
          <div className="grid gap-y-3">
            {pokemon.stats.map(statInfo => (
              <div key={statInfo.stat.name} className="flex items-center">
                <span className="w-28 font-medium text-lg capitalize">{statInfo.stat.name}:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-linear-to-r from-blue-400 to-purple-600 h-3 rounded-full"
                    style={{ width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%` }} // Escala a un máximo razonable
                  ></div>
                </div>
                <span className="ml-3 font-bold text-lg">{statInfo.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


