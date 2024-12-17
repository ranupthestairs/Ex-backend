import Axios from 'axios';
import { NextFunction, Response } from 'express';
import { VISA_BASEURL, RequestWithAuth } from '../constants';
import { generateVisaAuthHeader } from '../utils';

export const createTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;
    const url = VISA_BASEURL + 'pushfundstransactions/';
    const authHeader = generateVisaAuthHeader();
    console.log('debug here', data)
    try {
        const response = await Axios.post(url, data, {
            headers: authHeader
        })
        return res.status(response.status).send(response.data)
    } catch (err) {
        return next(err)
    }
    return res.status(200).send("success")
};