import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type SignInInput = z.infer<typeof signInSchema>;
