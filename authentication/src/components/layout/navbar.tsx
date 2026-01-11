'use client'

import { type FC } from "react";
import Link from "next/link";
import { LayoutDashboard, LayoutDashboardIcon, LogIn, LogOut, Zap } from "lucide-react"
import { User } from '@/interfaces/auth.interface'
import { UserAccountNav } from "../user-account-nav";

interface Props {
  user: User | null
}

const Navbar: FC<Props> = ({ user }) => {
  // console.log('navbar', user)

  return (
    // 1. Contenedor Principal (Efecto Glassmorphism)
    // fixed top-0: Se queda pegado arriba.
    // bg-white/70 backdrop-blur-md: El truco del vidrio (transparencia + desenfoque).
    // border-b: Una línea sutil abajo para definirlo.
    <header className="sticky top-0 h-16 border-b border-slate-200/50 bg-white/75 backdrop-blur-xl transition-all">

      {/* 2. Contenedor Interior (Centrado y Distribución) */}
      <nav className="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* --- SECCIÓN LOGO 'L.' --- */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group relative font-black text-3xl tracking-tighter transition-transform duration-300 hover:scale-105"
          >
            {/* La 'L' principal */}
            <span className="font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">L</span>
            {/* El punto '.' con un acento de color y animación  animate-pulse */}
            <span className="font-irish-grover bg-radial from-[#5F40BD] to-white bg-clip-text text-transparent">.</span>

            {/* Un pequeño destello sutil detrás al hacer hover */}
            <div className="absolute -inset-2 -z-10 rounded-full bg-blue-500/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100 dark:bg-blue-400/10" />
          </Link>
        </div>

        {/* --- SECCIÓN BOTONES --- */}
        <div className="flex items-center gap-4">
          {/* --- LÓGICA CONDICIONAL --- */}
          {user ? (
            // ESTADO: USUARIO LOGUEADO
            <UserAccountNav user={user} />
          ) : (
            // ESTADO: PÚBLICO (Invitado)
            <>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>

              <Link
                href="/sign-up"
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar
