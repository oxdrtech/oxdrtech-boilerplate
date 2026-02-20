import { z } from "zod";
import { createUserSchema } from "./create-user.schema";

export const updateUserSchema = createUserSchema.partial().omit({
  password: true,
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
