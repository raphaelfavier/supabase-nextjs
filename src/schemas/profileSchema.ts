import { z } from "zod";

// For reading from DB/API: username can be string, null, or undefined
export const profileReadSchema = z.object({
  username: z.string().optional().nullable(),
  full_name: z.string().nullable().optional(),
  avatar_url: z.union([z.string().url({ message: "Invalid avatar URL" }), z.literal("")]).nullable().optional(),
  website: z.union([z.string().url({ message: "Invalid website URL" }), z.literal("")]).nullable().optional(),
});

// For writing/updating: username, if present, must be at least 3 chars and not null
export const profileWriteSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
  full_name: z.string().nullable().optional(),
  avatar_url: z.union([z.string().url({ message: "Invalid avatar URL" }), z.literal("")]).nullable().optional(),
  website: z.union([z.string().url({ message: "Invalid website URL" }), z.literal("")]).nullable().optional(),
});
