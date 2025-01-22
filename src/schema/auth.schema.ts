import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(1).max(10),
    avatarUrl: z.string().url().optional()
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
