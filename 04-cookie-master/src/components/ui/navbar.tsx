import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-neutral-primary shadow shadow-amber-50/20">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/globe.svg" className="h-7" alt="Flowbite Logo" />
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">CookieMaster</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-white bg-blue-400 hover:bg-blue-500 box-border border border-transparent focus:ring-4 focus:ring-blue-400/60 shadow-xs font-medium leading-5 rounded-md text-sm px-3 py-2 focus:outline-none">Get started</button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link href="/" className="block py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</Link>
            </li>
            <li>
              <Link href="/services" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Services</Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
