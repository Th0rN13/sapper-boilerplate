import { config } from 'dotenv';
config();

export const databaseType = process.env.DATABASE_TYPE;
