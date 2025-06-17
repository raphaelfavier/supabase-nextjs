import { z } from "zod";
import { authSchema, passwordSchema } from "../schemas/authSchemas";

export type AuthType = z.infer<typeof authSchema>;

export type PasswordType = z.infer<typeof passwordSchema>;
