import { config } from 'dotenv';
config();

export const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_LOGIN,
  EMAIL_PASSWORD,
} = process.env;
