import { z } from "zod";

export const signinAuthSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type SigninAuthDTO = z.infer<typeof signinAuthSchema>;
