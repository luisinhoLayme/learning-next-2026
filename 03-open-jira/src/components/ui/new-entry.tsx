'use client'
import { UIContext } from '@/context/ui'
import { CreateFormState } from '@/interfaces/entry'
import { FormEvent, use, useActionState, useEffect, useState } from 'react'
import { actions } from '@/actions'
import { EntriesContext } from '@/context/entries'

const INITIAL_STATE: CreateFormState = {
  success: false,
  message: 'Validation error',
  description: '',
  errors: null
}

const NewEntry = () => {
  const [isAdding, setIsAdding] = useState(false)
  const { isAddingEntry, setIsAddingEntry } = use(UIContext)
  const { addNewEntry } = use(EntriesContext)

  const [formState, formAction, isPending] = useActionState(actions.entry.createEntryAction, INITIAL_STATE)

  // console.log({ formState, isPending })
  useEffect(() => {
    if (formState.success) {
      addNewEntry(formState.description)
      setIsAddingEntry(false)
    }
  }, [formState])

  return isAddingEntry && (
    <form className="bg-slate-50/5 mb-2 p-2 rounded-md" action={formAction}>
      <textarea
        placeholder="New Entry"
        name="description"
        className={`textarea textarea-neutral bg-transparent resize-none w-full mb-2 overflow-hidden`}
        onInput={(e: FormEvent<HTMLTextAreaElement>) => {
          const target = e.currentTarget;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
      ></textarea>
      {formState.errors &&
        <p className="text-xs text-red-500">{formState.errors}</p>
      }
      <div className="flex justify-between">
        <button onClick={() => setIsAddingEntry(false)} type='button' className="btn btn-error btn-sm btn-soft">
          Cancel
        </button>
        <button disabled={isPending} type='submit' className="btn btn-success btn-sm btn-soft">
          Save
        </button>
      </div>
    </form>
  )
}

export default NewEntry
