import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: './env' });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  DB_PORT: z.string().transform((v) => parseInt(v)),
  SERVER_PORT: z.string().transform((v) => parseInt(v)),
  DB_URL: z.string().describe('Postgres DB url'),
});
const safeParse = envVarsSchema.safeParse(process.env);

if (safeParse.success === false) {
  throw new Error(
    `Config validation error: ${JSON.stringify(safeParse.error.errors)}`,
  );
}
const envVars = safeParse.data;

export const config = {
  env: envVars.NODE_ENV,
  db_port: envVars.DB_PORT,
  server_port: envVars.SERVER_PORT,
  dbUrl: envVars.DB_URL,
};
