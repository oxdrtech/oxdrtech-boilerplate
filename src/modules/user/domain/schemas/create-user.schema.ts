import { z } from "zod";
import * as argon2 from "argon2";
import { UserRole } from "../../../../database/entities/user.entity";

export const createUserSchema = z.object({
  name: z.string().nonempty("Name é obrigatório"),
  email: z.email().nonempty("Email é obrigatório"),
  phone: z.string(),
  password: z.string().min(6).transform(async (val) => {
    return await argon2.hash(val);
  }),
  authorized: z.boolean().optional(),
  role: z.enum(UserRole),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
