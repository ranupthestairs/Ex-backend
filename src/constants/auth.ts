import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME;

export const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
