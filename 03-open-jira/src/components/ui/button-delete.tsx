'use client'
import { FC, use, useEffect, useState } from "react"
import { permanentRedirect } from "next/navigation"
import { EntriesContext } from "@/context/entries"
import { Trash } from "lucide-react"
import ConfirmDelete from './confirm-delete'

interface Props {
  id: string
}

const ButtonDelete:FC<Props> = ({id}) => {
  const { deleteEntry } = use(EntriesContext)
  const [ openModal, setOpenModal ] = useState(false)

  const deleteE = () => {
    setOpenModal(!openModal)
  }
  const confirmDelete = () => {
    setOpenModal(!openModal)
    deleteEntry(id)
    permanentRedirect('/')
  }
  return (
    <>
      {openModal &&
        <ConfirmDelete
          setOpenModal={setOpenModal}
          onConfirm={confirmDelete}
        />
      }
      <button onClick={deleteE} className="btn btn-sm btn-soft btn-error">
        <Trash size={16} />
        Delete
      </button>
    </>
  )
}

export default ButtonDelete
