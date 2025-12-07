'use client'
import { FormEvent, useState } from 'react'
import { Save } from 'lucide-react'
import Radio from './radio'

const FormTexarea = () => {
  return (
    <form className="mb-2 p-2 rounded-md w-full" action="">
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
      {/* {formState.errors && */}
      {/*   <p className="text-xs text-red-500">{formState.errors}</p> */}
      {/* } */}
      <Radio />
      <div className="flex justify-end">
        <button disabled={false} type='submit' className="btn btn-secondary btn-outline w-full text-xl uppercase">
          <Save />
          Save
        </button>
      </div>
    </form>

  )
}

export default FormTexarea
