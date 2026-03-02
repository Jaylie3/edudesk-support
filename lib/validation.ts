import { z } from 'zod';

export const ticketSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(10).max(2000),
  category: z.enum(['hardware', 'software', 'network', 'account', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  location: z.string().min(2).max(100),
  submittedBy: z.string().min(2).max(100),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
