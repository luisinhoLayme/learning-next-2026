"use server";

import { FormState } from "@/interfaces/auth.interface";
import { signUpSchema } from "@/lib/schemas/auth/signup.schema";
import z from "zod";
import { authService } from "@/lib/services/auth.service";
import { redirect } from "next/navigation";

export async function signUpAction(_: any, formData: FormData): Promise<FormState> {

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

  const result = await authService.signUp(validateFields.data);

  if (!result.ok) {
    return {
      data: fields,
      errors: result,
      success: false
    };
  }

  redirect('/')
}
