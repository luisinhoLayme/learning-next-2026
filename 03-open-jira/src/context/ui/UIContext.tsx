'use client'

import { createContext } from 'react'

export interface ContextProps {
  isAddingTask: boolean

  //Methods
  openAddForm: () => void
  closeAddForm: () => void
}

export const UIContext = createContext({} as ContextProps)
