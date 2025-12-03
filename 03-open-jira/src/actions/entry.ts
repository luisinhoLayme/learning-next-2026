"use server"

import { type CreateFormState } from "@/interfaces/entry";

export const createEntryAction = async (prevState: CreateFormState, formData: FormData): Promise<CreateFormState> => {

  const desc = formData.get('description') as string
  console.log('server')

  if (!desc.length) {
    return {
      success: false,
      message: 'Error validation',
      description: desc,
      errors: 'Missing Filed, description'
    }
  }


  return {
    success: true,
    message: 'Success',
    description: desc,
    errors: null
  }
}

