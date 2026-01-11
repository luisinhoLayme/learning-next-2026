'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Home, LayoutDashboard, LogOut, Settings, User, UserStar } from 'lucide-react'
import { User as UserAccount } from '@/interfaces/auth.interface'
import moduleName from '..'

interface UserAccountNavProps {
  user: UserAccount
}

export const UserAccountNav = ({ user }: UserAccountNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  console.log(user)

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      {/* BOTÓN DEL AVATAR */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 rounded-full p-1 transition-all hover:bg-slate-100"
      >
        <div className="hidden text-right sm:block px-2">
          <p className="text-sm font-bold text-slate-900 leading-none">
            {user.fullName}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
            {user.role}
          </p>
        </div>

        {/* Avatar con gradiente */}
        <div className="h-9 w-9 overflow-hidden rounded-full bg-linear-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-blue-500/30 transition-shadow">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
      </button>

      {/* EL DROPDOWN (Menú desplegable) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in duration-200 z-50">

          {/* Info del usuario (Mobile) */}
          <div className="px-3 py-2 sm:hidden border-b border-slate-100 mb-2">
            <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>

          <div className="space-y-1">
            {user.role === 'ADMIN' &&
              <Link
                href="/dashboard/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
              >
                <UserStar className="h-4 w-4" />
                Admin
              </Link>
            }
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
            >
              <User className="h-4 w-4" />
              Mi Perfil
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Link>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>

          <div className="my-2 border-t border-slate-100" />

          {/* Botón de Logout */}
          <button
            onClick={async () => {
              setIsOpen(false)
              await logoutAction()
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      )}
    </div>
  )
}
