import { z } from "zod";

export const createAccountBodySchema = z.object({ // instanciar o ZodValidation que implementa PipeTranform (validar dados do body)
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export const signInBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type SignInBodySchema = z.infer<typeof signInBodySchema>

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

