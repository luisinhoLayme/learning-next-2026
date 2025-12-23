import { SignUpInput } from "@/lib/schemas/auth/signup.schema";

export interface FormState {
  success: boolean
  data: SignUpInput,
  errors: any
}
