
export interface CreateFormState {
  success?: boolean
  message?: string
  description: string
  errors?: string | null
}

export interface Entry {
  id: string
  description: string
  createdAt: number
  status: EntryStatus
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished'
