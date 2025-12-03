'use client'

import { createContext } from 'react'

export interface ContextProps {
  isAddingEntry: boolean
  isDragging: boolean

  //Methods
  setIsAddingEntry: (value: boolean) => void
  startDragging: () => void
  endDragging: () => void
}

export const UIContext = createContext({} as ContextProps)
