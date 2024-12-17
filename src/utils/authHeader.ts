import oauth from 'mastercard-oauth1-signer';
import { VISA_API_KEY, VISA_SHARED_SECRET } from '../constants';

export const generateMastercardAuthHeader = (
    url: String, 
    method: String, 
    requestData: String, 
    consumerKey: String, 
    signingKey: Buffer,
) => {
    const authHeader = oauth.getAuthorizationHeader(url, method, requestData, consumerKey, signingKey);
    return authHeader;
}

export const generateVisaAuthHeader = () => ({
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${VISA_API_KEY}:${VISA_SHARED_SECRET}`).toString(
        'base64',
    )}`,
});