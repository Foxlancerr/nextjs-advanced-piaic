import { z } from "zod";
export const SignUpUserValidateSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  email: z.string().email(),
});
export const SignInUserValidateSchema = z.object({
  password: z.string().min(5),
  email: z.string().email(),
});

export type SignUpUser = z.infer<typeof SignUpUserValidateSchema>;
export type SignInUser = z.infer<typeof SignInUserValidateSchema>;
