'use client'

import { createContext } from 'react'
import { Entry } from '@/interfaces/entry'

export interface ContextProps {
  entries: Entry[]
}

export const EntriesContext = createContext({} as ContextProps)
