import dotenv from 'dotenv';
dotenv.config();

export const VISA_BASEURL = process.env.VISA_BASEURL;
export const VISA_USER_ID = process.env.VISA_USER_ID;
export const VISA_PASSWORD = process.env.VISA_PASSWORD;

export const VISA_KEY = Buffer.from(
    process.env.VISA_KEY.replace(/\\n/g, '\n'),
    'utf-8',
);
export const VISA_CERT = Buffer.from(
    process.env.VISA_CERT.replace(/\\n/g, '\n'),
    'utf-8',
);
export const VISA_CA = Buffer.from(
    process.env.VISA_CA.replace(/\\n/g, '\n'),
    'utf-8',
);