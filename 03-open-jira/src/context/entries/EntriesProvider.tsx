'use client'

import { type FC, type ReactNode, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '@/interfaces/entry'
import { toast } from 'react-toastify'

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[],
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addNewEntry = (newEntry: Entry) => {

    dispatch({ type: '[Entries]-AddEntry', payload: newEntry })
  }

  const updateEntry = async ({ id, description, status }: Entry, showAlert: boolean) => {
    // console.log({description, status})
    try {
      const resp = await fetch(`/api/entries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ description, status })
      })
      const entry: Entry = await resp.json()

      dispatch({ type: '[Entries]-EntryUpdated', payload: entry })
      if (showAlert) {

        toast.success('Entry Update Successfully.', {
          className: 'alert alert-secondary alert-soft',
        });
      }

    } catch (err) {
      console.log('error', err)
    }
  }

  const deleteEntry = async (id: string) => {
    // console.log({description, status})
    try {
      const resp = await fetch(`/api/entries/${id}`, {
        method: "DELETE",
      })
      const data = await resp.json()

      dispatch({ type: '[Entries]-EntryDelete', payload: id })
      toast.success(data.message, { className: 'alert alert-success alert-soft dark:bg-black' });
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
      updateEntry,
      deleteEntry
    }}>
      {children}
    </EntriesContext>
  )
}
