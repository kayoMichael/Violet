import { z } from 'zod';

export const ticketSchema = z.object({
    title: z.string().min(1, { message: "The title must be at least 1 character !" }).max(300, { message: "The title must be at least 300 character!" }),
    description: z.string().min(1, { message: "The submission must be at least 1 character !" })
});
