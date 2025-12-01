'use client'

import { use } from 'react'
import ThemeSwitcher from '../theme-switcher'
import { UIContext } from '@/context/ui'
import { CirclePlus } from 'lucide-react'

const Navbar = () => {
  const { sidemenuOpen, openSideMenu, closeSideMenu } = use(UIContext)

  return (
    <div className="navbar bg-base-100 shadow-sm dark:shadow-gray-50/20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Theme</a>
              <ul className="p-2">
                <li><a>light</a></li>
                <li><a>dark</a></li>
              </ul>
              <ThemeSwitcher />
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">OpenJIRA</a>

        <button className="btn btn-sm btn-soft btn-secondary">
        <CirclePlus size={16} />
          Add Task
        </button>

        {/* { */}
        {/*   sidemenuOpen */}
        {/*    ? <button onClick={closeSideMenu} className="btn btn-xs btn-soft btn-warning">close</button> */}
        {/*    : <button onClick={openSideMenu} className="btn btn-xs btn-soft btn-success">open</button> */}
        {/* } */}
        {/* <span */}
        {/*   className={`ml-2 font-bold ${sidemenuOpen ? 'text-success': 'text-warning'}`}> */}
        {/*   { sidemenuOpen ? 'Menu open' : 'Menu closed' } */}
        {/* </span> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <ThemeSwitcher />
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-soft btn-secondary">Logout</a>
      </div>
    </div>
  )
}

export default Navbar
