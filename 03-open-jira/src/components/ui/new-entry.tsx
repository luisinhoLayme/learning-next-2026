'use client'
import { CirclePlus } from 'lucide-react'

const NewEntry = () => {
  return (
    <form className="bg-warning/5 mb-2 p-2 rounded-md">
      <textarea placeholder="New Entry" className="textarea textarea-neutral bg-transparent resize-none w-full mb-2"></textarea>
      <div className="flex justify-between">
        <button className="btn btn-error btn-sm btn-outline">
          Cancel
        </button>
        <button className="btn btn-success btn-sm btn-outline">
          Save
        </button>
      </div>
    </form>
  )
}

export default NewEntry
