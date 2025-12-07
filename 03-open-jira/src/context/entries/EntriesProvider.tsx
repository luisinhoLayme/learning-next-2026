'use client'

import { type FC, type ReactNode, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces/entry'

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}


export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addNewEntry = (newEntry: Entry) => {

    dispatch({ type: '[Entries]-AddEntry', payload: newEntry })
  }

  const updateEntry = async ({ id, description, status }: Entry) => {
    try {
      const resp = await fetch(`/api/entries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({description, status})
      })
      const entry: Entry = await resp.json()

      dispatch({ type: '[Entries]-EntryUpdated', payload: entry })
    } catch (err) {
      console.log('error', err)
    }
  }

  const refreshEntries = async () => {
    const resp = await fetch('/api/entries')
    const data: Entry[] = await resp.json()
    dispatch({ type: '[Entries]-RefreshData', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext value={{
      ...state,
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext>
  )
}
