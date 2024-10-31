import dotenv from 'dotenv';

dotenv.config();

export const CONSUMER_KEY = process.env.MASTERCARD_CONSUMER_KEY;
export const PARTNER_ID = process.env.MASTERCARD_PARTNER_ID;
export const SIGNING_KEY = Buffer.from(
    process.env.SIGNING_KEY.replace(/\\n/g, '\n'),
    'utf-8',
);
