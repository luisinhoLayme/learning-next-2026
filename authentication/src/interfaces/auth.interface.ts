import { SignInInput } from "@/lib/schemas/auth/signin.schema";
import { SignUpInput } from "@/lib/schemas/auth/signup.schema";

export interface User {
    id: string,
    email: string,
    fullName: string,
    isActive: boolean,
    verify: boolean,
    role: string
}

export interface FormState {
  success: boolean
  data: SignUpInput,
  errors: any
}

export interface FormStateSignIn {
  success: boolean
  data: SignInInput,
  errors: any
}
