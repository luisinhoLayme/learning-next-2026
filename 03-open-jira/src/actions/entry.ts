"use server"

import { Entry } from "@/interfaces/entry";
import { type CreateFormState } from "@/interfaces/entry";

export const createEntryAction = async (prevState: CreateFormState, formData: FormData): Promise<CreateFormState> => {

  const desc = formData.get('description') as string
  console.log('server')

  if (!desc.length) {
    return {
      success: false,
      message: 'Error validation',
      description: desc,
      errors: 'Missing Filed, description',
    }
  }

  const resp = await fetch('http://localhost:3000/api/entries', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({description: desc})
  })
  const data: Entry = await resp.json()

  if (resp.ok) {
    return {
      success: true,
      message: 'Success',
      description: desc,
      errors: null,
      data
    }
  }

  return {
    success: false,
    message: 'Error Create',
    description: desc,
    errors: "Can't create entry",
    data
  }
}

