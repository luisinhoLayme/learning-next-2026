
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FC } from 'react'

interface Props {
  id: number
}

const FavoriteCardPokemon:FC<Props> = ({ id }) => {
  const router = useRouter()

  return (
    <motion.article
      key={id}
      onClick={() => router.push(`/pokemon/${id}`)}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="
        relative m-3 p-4 rounded-2xl cursor-pointer
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-md hover:shadow-xl
        flex flex-col items-center
      "
    >

      <div className="relative w-40 h-40 mb-2">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          alt={'pokemon #${ id }'}
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      {/* fondo difuminado detrás del Pokémon */}
      <div className="
        absolute inset-0 -z-10
        bg-linear-to-br from-pink-400/20 to-blue-400/20
        rounded-2xl blur-xl
      " />
    </motion.article>
  )
}

export default FavoriteCardPokemon
