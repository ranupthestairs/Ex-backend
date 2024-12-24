import { NextFunction, Response } from 'express';
import { VISA_BASEURL, VISA_USER_ID, VISA_PASSWORD, VISA_KEY, VISA_CERT } from '../constants';
import { RequestWithAuth } from '../constants';
import https from 'https';
import request from 'request';

export const helloWorld = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const url = VISA_BASEURL + '/vdp/helloworld';

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
    
    // const auth = Buffer.from(VISA_USER_ID + ':' + VISA_PASSWORD).toString('base64');

    console.log('debug here', data, url)
    try {
        request.get(options, (err, response, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${response.statusCode}`);
            console.log(body);
            return res.status(response.statusCode).send(body)
        });
    } catch (err) {
        return next(err)
    }
};

// export const createTransaction = async (
//     req: RequestWithAuth,
//     res: Response,
//     next: NextFunction,
// ) => {
//     const data = req.body;

//     const url = VISA_BASEURL + 'vdp/helloworld';
//     const httpsAgent = new https.Agent({
//         key: VISA_KEY,
//         cert: VISA_CERT,
//         ca: VISA_CA
//     })

//     console.log('debug here', data)
//     try {
//         const response = await Axios.post(url, data, {
//             httpsAgent: httpsAgent,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': 'Basic' + Buffer.from(`${VISA_USER_ID}:${VISA_PASSWORD}`).toString('base64')
//             }
//         })
//         return res.status(response.status).send(response.data)
//     } catch (err) {
//         return next(err)
//     }
//     return res.status(200).send("success")
// };