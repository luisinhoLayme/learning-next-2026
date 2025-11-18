import { ValidationErrors } from "./validate-form"

export type FormState = {
  success?: boolean
  message?: string
  data?: {
    identifier?: string
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
  },
  strapiErrors?: {
    status: number
    name: string
    message: string
    details?: Record<string, string[]>
  } | null,
  errors: any
}
