import dotenv from 'dotenv';
dotenv.config();

export const VISA_API_KEY = process.env.VISA_API_KEY;
export const VISA_SHARED_SECRET = process.env.VISA_SHARED_SECRET;
export const VISA_BASEURL = process.env.VISA_BASEURL;