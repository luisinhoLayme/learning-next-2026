'use client'

import { use } from 'react'
import ThemeSwitcher from '../theme-switcher'
import { UIContext } from '@/context/ui'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { Sun, Moon } from "lucide-react";
import { changeTheme } from '../theme-switcher'

const Navbar = () => {
  const { setIsAddingEntry, toggleTheme } = use(UIContext)
  const pathname = usePathname()

  const showAddingEntry = () => {
    if (pathname !== '/') {
      setIsAddingEntry(true)
      redirect('/')
    }
    setIsAddingEntry(true)
  }

  return (
    <div className="navbar bg-base-100 shadow-sm dark:shadow-gray-50/20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow dark:shadow-gray-50/5">
            <li><Link href="/">Entries</Link></li>
            <li>
              <a>Theme</a>
              <ul className="p-2">
                <li
                  onClick={() => {
                    changeTheme('blossom')
                    toggleTheme('light')
                  }}
                ><a><Sun size={16} /> light</a></li>
                <li
                  onClick={() => {
                    changeTheme('midnightBlossom')
                    toggleTheme('dark')
                  }}
                ><a><Moon size={16} /> dark</a></li>
              </ul>
            </li>
            <li><Link href="/how-to-use">How to Use</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">OpenJIRA</Link>

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Entries</Link></li>
          <li>
            <ThemeSwitcher />
          </li>
          <li><Link href="/how-to-use">How to Use</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={showAddingEntry}
          className="btn btn-soft btn-secondary flex items-center"
        >
          <CirclePlus size={20} className="w-max h-max" />
          <span className="w-max h-max capitalize translate-0.5">new entry</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar
