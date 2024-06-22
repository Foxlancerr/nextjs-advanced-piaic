import { z } from "zod";
export const UserInfoValidateSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  email: z.string().email(),
});

export type UserInfoType = z.infer<typeof UserInfoValidateSchema>;
