'use client'
import { ChangeEvent, FC, FormEvent, use, useState } from 'react'
import { Save } from 'lucide-react'
import Radio from './radio'
import { Entry, EntryStatus } from '@/interfaces/entry'
import { EntriesContext } from '@/context/entries'
import { permanentRedirect } from 'next/navigation'

interface Props {
  entry: Entry
}

const FormTexarea:FC<Props> = ({ entry }) => {
  // console.log(entry)

  const { updateEntry } = use(EntriesContext)

  const [ textField, setTextField ] = useState(entry.description)
  const [ status, setStatus ] = useState<EntryStatus>(entry.status)
  const [ errorForm, setErrorForm ] = useState(false)


  const onTextFieldChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1) setErrorForm(false)
    setTextField(e.target.value)
  }

  const onSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (textField.trim().length <= 0) {
      setErrorForm(true)
      return;
    }

    const updatedEntry:Entry = {
      ...entry,
      status,
      description: textField
    }

    updateEntry(updatedEntry, true)
    permanentRedirect('/')
  }

  return (
    <>
      <form className="mb-2 p-2 rounded-md w-full" onSubmit={onSave}>
        <textarea
          placeholder="New Entry"
          name="description"
          className={`textarea ${errorForm ? 'textarea-error':'textarea-neutral'}  bg-transparent resize-none w-full mb-2 overflow-hidden`}
          value={textField}
          onChange={onTextFieldChanged}
          onInput={(e: FormEvent<HTMLTextAreaElement>) => {
            const target = e.currentTarget;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
        ></textarea>
        {errorForm &&
          <p className="text-xs text-left text-red-500">Missing Filed, description</p>
        }
        <Radio
          status={status}
          setStatus={setStatus}
        />
        <div className="flex justify-end">
          <button type='submit' className="btn btn-secondary btn-outline w-full text-xl uppercase">
            <Save />
            Save
          </button>
        </div>
      </form>
    </>

  )
}

export default FormTexarea
