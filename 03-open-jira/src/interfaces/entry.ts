
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
  createdAt: string
  status: EntryStatus
}

// export enum EntryStatus {
//   pending = "pending",
//   progress = 'progress',
//   finished = 'finished'
// }

export type EntryStatus = 'pending' | 'progress' | 'finished'
