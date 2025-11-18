import { type Section } from '@/intefaces/response-strapi'
import { type FC } from 'react'
import Link from 'next/link'

type Props = {
  data: Section[]
}

const HeroSection: FC<Props> = ({ data }) => {

  const { heading, subHeading, link, image } = data[0]

  const bgImage = `http://localhost:1337${image.url}`

  return (
    <div className={ `min-h-screen flex items-center justify-center relative before:content-[''] before:absolute before:inset-0 before:bg-black/40 before:z-15` }>
      <img src={bgImage} className='absolute inset-0 z-10 h-full object-cover' alt="image bg" />

      <div className="text-center px-6 max-w-4xl relative z-20">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          { heading }
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
          { subHeading }
        </p>
        <Link href={link.href} className="bg-white text-purple-600 font-semibold text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
          { link.label }
        </Link>
      </div>
    </div>
  )
}

export default HeroSection
