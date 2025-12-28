"use server";

import { FormState } from "@/interfaces/auth.interface";
import { SignUpInput, signUpSchema } from "@/lib/schemas/auth/signup.schema";
import z from "zod";
import { env } from '@/lib/schemas/env'
import { authService } from "@/lib/services/auth.service";

export async function signUpAction(_: any, formData: FormData): Promise<FormState> {
  console.log(env.NEXT_PUBLIC_API_URL)
  const fields = {
    fullName: formData.get('fullName') as string,
    mail: formData.get('mail') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    terms: formData.get('terms') === 'on',
  }

  const validateFields = signUpSchema.safeParse(fields)

  if (!validateFields.success) {
    return {
      data: fields,
      errors: z.flattenError(validateFields.error).fieldErrors,
      success: false
    };
  }

  try {
    // 2. Llamamos al servicio
    const user = await authService.signUp(validateFields.data);

    return {
      data: user,
      errors: null,
      success: true
    };
  } catch (error: any) {
    // 3. Manejamos errores del backend
    console.log(error)
    return { errors: error.message, success: false, data: fields };
  }

  // await signUp(parsed.data);
}
