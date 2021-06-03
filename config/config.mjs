import dotenv from 'dotenv';

dotenv.config();

let envDbName = process.env.DB_NAME;
let envDbUsername = process.env.DB_USERNAME;
let envDbPass = process.env.DB_PASS;
let envDbHost = process.env.DB_HOST;

if (process.env.NODE_ENV === 'dev') {
    envDbName = process.env.DB_NAME;
    envDbUsername = process.env.DB_USERNAME;
    envDbPass = process.env.DB_PASS;
    envDbHost = process.env.DB_HOST;
}

if (process.env.NODE_ENV === 'test') {
    envDbName = process.env.TEST_DB_NAME;
    envDbUsername = process.env.TEST_DB_USERNAME;
    envDbPass = process.env.TEST_DB_PASS;
    envDbHost = process.env.TEST_DB_HOST;
}

export const dbName = envDbName;
export const dbUsername = envDbUsername;
export const dbPass = envDbPass;
export const dbHost = envDbHost;
