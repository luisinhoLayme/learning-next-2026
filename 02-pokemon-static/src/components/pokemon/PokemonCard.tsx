"use client"

import Image from "next/image";
import { SmallPokemon } from "@/interfaces/pokemon-list";
import { FC } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  pokemon: SmallPokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/pokemon/${pokemon.id}`)
  }
  return (
    <motion.article
      onClick={onClick}
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
          src={pokemon.img}
          alt={pokemon.name}
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      <span className="font-semibold text-white tracking-wide">
        #{pokemon.id} • {pokemon.name}
      </span>

      {/* fondo difuminado detrás del Pokémon */}
      <div className="
        absolute inset-0 -z-10
        bg-linear-to-br from-pink-400/20 to-blue-400/20
        rounded-2xl blur-xl
      " />
    </motion.article>
  );
};

export default PokemonCard;
