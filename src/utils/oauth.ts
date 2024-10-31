import oauth from 'mastercard-oauth1-signer';

export const generateAuthHeader = (
    url: String, 
    method: String, 
    requestData: String, 
    consumerKey: String, 
    signingKey: Buffer,
) => {
    const authHeader = oauth.getAuthorizationHeader(url, method, requestData, consumerKey, signingKey);
    return authHeader;
}