import { NextFunction, Request, Response } from "express";
import Axios from "axios";
import { CONSUMER_KEY, PARTNER_ID } from '../constants';
import { generateAuthHeader } from "src/utils";
import fs from 'fs';

export const createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;
    const url = `https://sandbox.api.mastercard.com/send/static/v1/partners/${PARTNER_ID}/transfers/payment`;
    const signingKey = fs.readFileSync('../../myrsa.key');
    const authHeader = generateAuthHeader(url, 'POST', JSON.stringify(data), CONSUMER_KEY, signingKey);
    try {
        Axios.post(url, data, {
            headers: {
                'Authorization': authHeader,
            },
        }).then((response) => {
                // validate the data
                res.status(200).send(response.data);
            })
            .catch((error) => {
                console.log('createTransaction Error:', error.message);
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            })
        } catch (err) {
            return next(err);
        }
    }

export const getTransactionStatusById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    const url = `https://sandbox.api.mastercard.com/send/static/v1/partners/${PARTNER_ID}/transfers/${id}`;
    const signingKey = fs.readFileSync('../../myrsa.key');
    const authHeader = generateAuthHeader(url, 'GET', '', CONSUMER_KEY, signingKey);

    if (!id) return res.status(400).send({ message: 'Invalid parameter' });
    try {
        Axios.get(url, {
            headers: {
                'Authorization': authHeader,
            }
        })
            .then((response) => {
                console.log('Response:', response.data);
                res.status(200).send(response.data);
            })
            .catch((error) => {
                console.log('getTransactionStatusById Error:', error.message);
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            });
    } catch (err) {
        return next(err);
    }
}