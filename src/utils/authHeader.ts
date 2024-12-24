import oauth from 'mastercard-oauth1-signer';
import https from 'https';
import { VISA_BASEURL, VISA_USER_ID, VISA_PASSWORD, VISA_KEY, VISA_CERT } from '../constants';

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

export const generateVisaAuthHeader = (addUrl) => {
    const url = VISA_BASEURL + addUrl;

    var options = {
        hostname: 'sandbox.api.visa.com',
        port: 443,
        uri: url,
        method: 'GET',
        key: VISA_KEY,
        cert: VISA_CERT,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(VISA_USER_ID + ':' + VISA_PASSWORD).toString('base64')
        },
        json: true,
        agent: {}
    };
    options.agent = new https.Agent(options);

    return options;
};