import 'dotenv/config';

export const DB_CONNECTION_STRING = process.env.MONGO_URI as string;

export const NODE_ENV_STRING = process.env.NODE_ENV as string;

export const PORT = process.env.PORT as string;

export const PRODUCTION: string = 'production';