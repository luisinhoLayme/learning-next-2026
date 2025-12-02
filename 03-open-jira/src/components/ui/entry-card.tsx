'use client'

import { FC, useEffect, useState } from 'react'
import { Entry } from '@/interfaces/entry'

interface Props {
  entry: Entry
  colors: {bg: string, text: string}
}


const EntryCard:FC<Props> = ({entry, colors}) => {

  return (
    <article className={`${colors.bg} min-h-20 cursor-pointer select-none transition-colors rounded-md`}>
      <div className="p-2 h-full flex flex-col justify-between">
        <p className="dark:text-slate-50/80">{entry.description}</p>
        <footer className={`flex justify-end text-xs ${ colors.text }`}>
          Hace 30 minutos
        </footer>
      </div>
    </article>
  )
}

export default EntryCard
