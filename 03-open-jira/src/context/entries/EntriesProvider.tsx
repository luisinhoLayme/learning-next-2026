'use client'

import { type FC, type ReactNode, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces/entry'

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      id: crypto.randomUUID(),
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, aperiam?',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      id: crypto.randomUUID(),
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, aperiam?',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      id: crypto.randomUUID(),
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, aperiam?',
      status: 'finished',
      createdAt: Date.now() - 100000
    },
  ]
}

export const EntriesProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  return (
    <EntriesContext value={{
      ...state
    }}>
      {children}
    </EntriesContext>
  )
}
