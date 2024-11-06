import Axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { CONSUMER_KEY, PARTNER_ID, SIGNING_KEY } from '../constants';
import { generateAuthHeader } from '../utils';
import User from '../models/user.model';
import Transaction from '../models/transaction.model';

interface CustomRequest extends Request {
    email: string;
}

export const createTransaction = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
) => {

    const data = req.body;
    // console.log('-----body \n', data);
    const url = `https://sandbox.api.mastercard.com/send/static/v1/partners/${PARTNER_ID}/transfers/payment`;
    const authHeader = generateAuthHeader(
        url,
        'POST',
        JSON.stringify(data),
        CONSUMER_KEY,
        SIGNING_KEY,
    );
    try {
        // add billing info
        
        const response = await Axios.post(url, data, {
            headers: {
                Authorization: authHeader,
            },
        });

        await Transaction.create({
            from: req.email,
            payment_transfer: req.body.payment_transfer,
        });

        await User.findOneAndUpdate(
            { email: req.email },
            { 
                $set: {
                    billingInfo: {
                        accountType: req.body.payment_transfer.sender.account_type,
                        address: req.body.payment_transfer.sender.address,
                        debitUri: req.body.payment_transfer.sender_account_uri,
                    },
                }
            },
            { upsert: true },
        );

        return res.status(200).send(response.data);
        
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
        const response = await Axios.get(url, {
            headers: {
                Authorization: authHeader,
            },
        });
        res.status(200).send(response.data);
    } catch (err) {
        return next(err);
    }
};
