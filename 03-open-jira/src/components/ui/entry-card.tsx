'use client'

import { DragEvent, FC, use, useEffect, useState } from 'react'
import { Entry } from '@/interfaces/entry'
import { UIContext } from '@/context/ui'
import { useRouter } from 'next/navigation'
import { timeAgo } from '@/utils/dateFunctions'

interface Props {
  entry: Entry
  colors: {bg: string, text: string}
}


const EntryCard:FC<Props> = ({entry, colors}) => {
  const router = useRouter()
  const { startDragging, endDragging } = use(UIContext)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    // console.log(e)
    e.dataTransfer.setData('text', entry.id)

    // modificar el estado, para indicar que estoy haciendo drag
    startDragging()
  }

  const onDragEnd = () => {
    // cancelar on drag
    endDragging()
  }

  const onClick = () => {
    router.push(`/entries/${ entry.id }`)
  }

  return (
    <article
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`${colors.bg} min-h-20 cursor-pointer select-none transition-colors rounded-md`}
    >
      <div className="p-2 h-full flex flex-col justify-between">
        <p className="dark:text-slate-50/80 whitespace-pre-wrap">{entry.description}</p>
        <footer className={`flex justify-end text-xs ${ colors.text }`}>
          { timeAgo(entry.createdAt) }
        </footer>
      </div>
    </article>
  )
}

export default EntryCard
