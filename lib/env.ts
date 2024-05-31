import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  NEXTAUTH_URL: z.string().default('http://localhost:3000'),
  NEXTAUTH_SECRET: z.string().min(16),
});

const env = envSchema.parse(process.env);

export default env;
