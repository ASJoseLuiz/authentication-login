import { z } from "zod";

export const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4), //regex()
});

export const deleteAccountByEmail = z.object({
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

export const tokenSchema = z.object({
  sub: z.string().uuid(),
});

export type DeleteAccountByEmail = z.infer<typeof deleteAccountByEmail>;

export type UpdatePasswordByEmail = z.infer<typeof updatePasswordByEmail>;

export type GetAccountByEmail = z.infer<typeof getAccountByEmail>;

export type PayloadBodySchema = z.infer<typeof payloadBodySchema>;

export type SignInBodySchema = z.infer<typeof signInBodySchema>;

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

export type TokenSchema = z.infer<typeof tokenSchema>;
