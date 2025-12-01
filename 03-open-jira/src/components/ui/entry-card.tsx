'use client'

import { FC, useEffect, useState } from 'react'
import { Entry } from '@/interfaces/entry'

interface Props {
  entry: Entry
}

const EntryCard:FC<Props> = ({entry}) => {

  const [ color, setColor ] = useState('warning')

  useEffect(() => {
    if (entry.status === 'pending') {
      setColor('warning')
    }
    if (entry.status === 'in-progress') {
      setColor('info')
    }
    if (entry.status === 'finished') {
      setColor('success')
    }
  }, [entry.status])

  return (
    <article className={`bg-${color}/5  min-h-20 cursor-pointer select-none hover:bg-${color}/7 transition-colors rounded-md`}>
      <div className="p-2 h-full flex flex-col justify-between">
        <p className="dark:text-slate-50/80">{entry.description}</p>
        <footer className={`flex justify-end text-xs text-${color}/60`}>
          Hace 30 minutos
        </footer>
      </div>
    </article>
  )
}

export default EntryCard
