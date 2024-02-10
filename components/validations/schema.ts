import { z } from 'zod';

export const ticketSchema = z.object({
    title: z.string().min(1, { message: "The title must be at least 1 character !" }).max(300, { message: "The title must be at least 300 character!" }),
    description: z.string().min(1, { message: "The submission must be at least 1 character !" }),
    status: z.string().optional().or(z.literal('')),
    label: z.string().optional().or(z.literal('')),
    priority: z.string().optional().or(z.literal('')),
});

export type Ticket = z.infer<typeof ticketSchema>;