import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, "Minimum 6 characters."),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  mail: z.email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string()
    .min(8, { message: 'Minimum 8 characters.' })
    .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter.' })
    .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter.' }) // <-- Regex para mayúscula añadida
    .regex(/[0-9]/, { message: 'Must contain at least one number.' })
    .trim(),
  confirmPassword: z.string().trim(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
