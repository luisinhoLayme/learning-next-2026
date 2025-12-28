"use server";

import z from "zod";
import { FormStateSignIn } from "@/interfaces/auth.interface";
import { authService } from "@/lib/services/auth.service";
import { signInSchema } from "@/lib/schemas/auth/signin.schema";
import { redirect } from "next/navigation";

export async function signInAction(_: any, formData: FormData): Promise<FormStateSignIn> {
  const fields = {
    mail: formData.get('mail') as string,
    password: formData.get('password') as string,
    remember: formData.get('remember') === 'on',
  }

  const validateFields = signInSchema.safeParse(fields)

  if (!validateFields.success) {
    return {
      data: fields,
      errors: z.flattenError(validateFields.error).fieldErrors,
      success: false
    };
  }

  const resp = await authService.signIn(validateFields.data);

  if(!resp.ok) {
    return {
      data: fields,
      errors: resp,
      success: false
    };
  }

  redirect('/dashboard')
}
