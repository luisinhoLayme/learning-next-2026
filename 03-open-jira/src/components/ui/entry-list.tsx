'use client'

import { EntryStatus } from '@/interfaces/entry'
import EntryCard from './entry-card'
import { FC, use } from 'react'
import { EntriesContext } from '@/context/entries'

interface Props {
  status: EntryStatus
}

const colors = {
  'pending': {
    bg: 'bg-warning/5 hover:bg-warning/7',
    text: 'text-warning/60'
  },
  'in-progress': {
    bg: 'bg-info/5 hover:bg-info/7',
    text: 'text-info/60'
  },
  'finished': {
    bg: 'bg-success/5 hover:bg-success/7',
    text: 'text-success/60'
  },
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
              <EntryCard key={entry.id} entry={entry} colors={colors[entry.status]} />
            ))
          }
        </li>
      </ul>
    </section>
  )
}

export default EntryList
