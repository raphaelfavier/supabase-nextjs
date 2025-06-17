import { z } from "zod";

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const authSchema = passwordSchema.extend({
  email: z.string().email({ message: "Invalid email address" }),
});
