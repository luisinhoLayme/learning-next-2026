"use server";

import { FormState } from "@/interfaces/signup.interface";
import { SignUpInput, signUpSchema } from "@/lib/schemas/auth/signup.schema";
// import { signUp } from "@/lib/services/auth.service";

export async function signUpAction(_: any, formData: FormData): Promise<FormState> {
  const fields = {
    fullName: formData.get('fullName') as string,
    mail: formData.get('mail') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    terms: formData.get('terms') === 'on',
  }

  const data = signUpSchema.safeParse(fields)

  if (!data.success) return { data: fields, errors: data.error.flatten().fieldErrors, success: false };



  // await signUp(parsed.data);
  return { data: data.data, errors: null, success: true };
}
