import Axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { CONSUMER_KEY, PARTNER_ID, SIGNING_KEY } from '../constants';
import { generateAuthHeader } from '../utils';

export const createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    const data = req.body;
    console.log('-----body \n', data);
    const url = `https://sandbox.api.mastercard.com/send/static/v1/partners/${PARTNER_ID}/transfers/payment`;
    const authHeader = generateAuthHeader(
        url,
        'POST',
        JSON.stringify(data),
        CONSUMER_KEY,
        SIGNING_KEY,
    );
    try {
        Axios.post(url, data, {
            headers: {
                Authorization: authHeader,
            },
        })
            .then((response) => {
                // validate the data
                res.status(200).send(response.data);
            }).catch((error) => {
                console.log('createTransaction Error:', error.message);
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            });
    } catch (err) {
        return next(err);
    }
};

export const getTransactionStatusById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    const url = `https://sandbox.api.mastercard.com/send/static/v1/partners/${PARTNER_ID}/transfers/${id}`;
    const authHeader = generateAuthHeader(
        url,
        'GET',
        '',
        CONSUMER_KEY,
        SIGNING_KEY,
    );

    if (!id) return res.status(400).send({ message: 'Invalid parameter' });
    try {
        Axios.get(url, {
            headers: {
                Authorization: authHeader,
            },
        })
            .then((response) => {
                res.status(200).send(response.data);
            })
            .catch((error) => {
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            });
    } catch (err) {
        return next(err);
    }
};
