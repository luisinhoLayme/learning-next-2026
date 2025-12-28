import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
  NEXT_PUBLIC_BASE_URL: z.string(),
});

// Esto lanzará un error detallado si falta alguna variable
export const env = envSchema.parse(process.env);
