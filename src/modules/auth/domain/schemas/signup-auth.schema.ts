import { z } from "zod";
import * as argon2 from "argon2";

export const signupAuthSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  password: z.string().min(6).transform(async (val) => {
    return await argon2.hash(val);
  }),
});

export type SignupAuthSchema = z.infer<typeof signupAuthSchema>;
