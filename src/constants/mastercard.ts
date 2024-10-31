import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

export const CONSUMER_KEY = process.env.MASTERCARD_CONSUMER_KEY;
export const PARTNER_ID = process.env.MASTERCARD_PARTNER_ID;
export const SIGNING_KEY = fs.readFileSync('./myrsa.key');