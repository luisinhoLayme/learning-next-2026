'use client'

import { createContext } from 'react'

export interface ContextProps {
  isAddingEntry: boolean
  isDragging: boolean
  theme: string

  //Methods
  setIsAddingEntry: (value: boolean) => void
  startDragging: () => void
  endDragging: () => void
  toggleTheme: (theme: string) => void
}

export const UIContext = createContext({} as ContextProps)
