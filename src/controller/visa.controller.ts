import { NextFunction, Response } from 'express';
// import { VISA_BASEURL, VISA_USER_ID, VISA_PASSWORD, VISA_KEY, VISA_CERT } from '../constants';
import { RequestWithAuth } from '../constants';
import request from 'request';
import { generateVisaAuthHeader } from '../utils';

export const helloWorld = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const options = generateVisaAuthHeader('/vdp/helloworld');

    console.log('debug here', data)
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

export const pullFundTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const options = generateVisaAuthHeader('/visadirect/fundstransfer/v1/pullfundstransactions',data);

    console.log('debug here', data)
    try {
        request.post(options, (err, response, body) => {
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

export const pushFundTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const options = generateVisaAuthHeader('/visadirect/fundstransfer/v1/pushfundstransactions',data);

    console.log('debug here', data)
    try {
        request.post(options, (err, response, body) => {
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