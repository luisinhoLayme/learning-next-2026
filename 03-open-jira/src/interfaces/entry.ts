
export interface CreateFormState {
  success?: boolean
  message?: string
  description: string
  errors?: string | null
  data?: Entry
}

export interface Entry {
  id: string
  description: string
  createdAt: number
  status: EntryStatus
}

// export enum EntryStatus {
//   pending = "pending",
//   'in-progress' = 'in-progress',
//   finished = 'finished'
// }

export type EntryStatus = 'pending' | 'progress' | 'finished'
