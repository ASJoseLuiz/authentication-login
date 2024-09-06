import { z } from "zod";

export const createAccountBodySchema = z.object({
  // instanciar o ZodValidation que implementa PipeTranform (validar dados do body)
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const updatePasswordByEmail = z.object({
  email: z.string().email(),
  oldPassword: z.string(),
  newPassword: z.string(),
});

export const getAccountByEmail = z.object({
  email: z.string().email(),
});

export const signInBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const payloadBodySchema = z.object({
  sub: z.string(),
  email: z.string().email(),
});

export type UpdatePasswordByEmail = z.infer<typeof updatePasswordByEmail>;

export type GetAccountByEmail = z.infer<typeof getAccountByEmail>;

export type PayloadBodySchema = z.infer<typeof payloadBodySchema>;

export type SignInBodySchema = z.infer<typeof signInBodySchema>;

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
