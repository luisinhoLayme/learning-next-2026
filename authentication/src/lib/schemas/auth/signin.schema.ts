import { z } from "zod";

export const signInSchema = z.object({
  mail: z.email({ message: 'Please enter a valid email.' }),
  password: z.string().min(2, "Minimum 2 characters."),
  remember: z.preprocess(
    (val) => (val === 'on' ? true : val === null ? false : val),
    z.boolean()
  ).optional()
});

export type SignInInput = z.infer<typeof signInSchema>;
