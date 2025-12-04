'use client'

import { createContext } from 'react'
import { Entry } from '@/interfaces/entry'

export interface ContextProps {
  entries: Entry[]

  //Methods
  addNewEntry: (entry: Entry) => void
  updateEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as ContextProps)
