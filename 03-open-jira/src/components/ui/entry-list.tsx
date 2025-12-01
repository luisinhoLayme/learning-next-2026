'use client'

import { EntryStatus } from '@/interfaces/entry'
import EntryCard from './entry-card'
import { FC, use } from 'react'
import { EntriesContext } from '@/context/entries'

interface Props {
  status: EntryStatus
}

const EntryList:FC<Props> = ({ status }) => {
  const { entries } = use(EntriesContext)

  const entriesByStatus = entries.filter(entry => entry.status === status)

  return (
    <section>
      <ul className="list h-[calc(100vh-125px)] overflow-auto">
        <li className="grid gap-2">
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry.id} entry={entry} />
            ))
          }
        </li>
      </ul>
    </section>
  )
}

export default EntryList
