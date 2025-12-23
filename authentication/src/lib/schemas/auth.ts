import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: 'Introduce un correo válido.' }),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }).trim(),
  email: z.email({ message: 'Introduce un correo válido.' }).trim(),
  password: z.string()
    .min(8, { message: 'Mínimo 8 caracteres.' })
    .regex(/[a-zA-Z]/, { message: 'Debe contener al menos una letra.' })
    .regex(/[0-9]/, { message: 'Debe contener al menos un número.' })
    .trim(),
  confirmPassword: z.string().trim(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
