"use client"

import { User } from '@/interfaces/auth.interface'
import { createContext, use, useContext } from 'react'

export interface ContextProps {
  user: User | null
}

export const UserContext = createContext({} as ContextProps)

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
}
