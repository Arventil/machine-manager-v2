import dotenv from 'dotenv';

dotenv.config();

export const dbName = process.env.DB_NAME;
export const dbUsername = process.env.DB_USERNAME;
export const dbPass = process.env.DB_PASS;
export const dbHost = process.env.DB_HOST;
