import { z } from "zod";
import { authSchema } from "../schemas/authSchemas";

export type AuthType = z.infer<typeof authSchema>;
