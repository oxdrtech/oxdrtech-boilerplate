import { z } from "zod";

export const signinAuthSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SigninAuthSchema = z.infer<typeof signinAuthSchema>;
