import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-gray-50/15 dark:bg-background/60">
      <div className="flex flex-wrap justify-between items-center mx-auto py-4 container">
        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
            alt="Logon image"
            width={35}
            height={35}
            loading='eager'
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <strong className="text-3xl">P</strong>okemon
          </span>
        </a>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a href="#" className="text-sm  text-gray-500 dark:text-white hover:underline">Follow</a>
          <a href="#" className="text-sm  text-primary dark:text-chart-1 hover:underline">Favorites</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
