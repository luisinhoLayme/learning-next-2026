'use client'

import { EntryStatus } from '@/interfaces/entry'
import EntryCard from './entry-card'
import { DragEvent, FC, use } from 'react'
import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'

interface Props {
  status: EntryStatus
}

const colors = {
  pending: {
    bg: 'bg-warning/5 hover:bg-warning/7',
    text: 'text-warning/60'
  },
  progress: {
    bg: 'bg-info/5 hover:bg-info/7',
    text: 'text-info/60'
  },
  finished: {
    bg: 'bg-success/5 hover:bg-success/7',
    text: 'text-success/60'
  },
}
const EntryList:FC<Props> = ({ status }) => {
  const { entries, updateEntry } = use(EntriesContext)
  const { isDragging, endDragging } = use(UIContext)

  const entriesByStatus = entries.filter(entry => entry.status === status)

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text')

    const entry = entries.find(e => e.id === id)!
    entry.status = status
    // console.log(entry)
    updateEntry(entry, false)
    endDragging()
  }

  return (
    <section
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={`${isDragging ? 'dark:bg-amber-50/5 border-dashed dark:border-amber-50/30 border-2 ':'border-2 border-transparent'} w-full h-[calc(100vh-120px)] p-2 rounded-md`}
    >
      <ul
        className={`list h-[calc(100vh-125px)] overflow-auto ${ isDragging ? 'opacity-60' : '' }`}
      >
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
