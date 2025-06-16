import { profileReadSchema } from "@/schemas/profileSchema";
import z from "zod";

export type ProfileType = z.infer<typeof profileReadSchema>;
