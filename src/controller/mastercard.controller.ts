import Axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import {
    CONSUMER_KEY,
    PARTNER_ID,
    SIGNING_KEY,
    MASTERCARD_BASEURL,
} from '../constants';
import { generateAuthHeader } from '../utils';
import User from '../models/user.model';
import Transaction from '../models/transaction.model';
import { RequestWithAuth } from 'src/constants/interfaces';

export const createTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;
    // console.log('-----body \n', data);
    const url = MASTERCARD_BASEURL + PARTNER_ID + '/transfers/payment';
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

        try {
            await Transaction.create({
                from: req.email,
                transfer: response.data.transfer,
            });

            const {
                sender,
                recipient,
                sender_account_uri,
                recipient_account_uri,
                funding_source,
            } = data.payment_transfer;

            await User.findOneAndUpdate(
                { email: req.email },
                {
                    $set: {
                        billingInfo: {
                            accountType: sender.account_type,
                            address: sender.address,
                            debitUri: sender_account_uri,
                            fundingSource: funding_source,
                            firstName: sender.first_name,
                            lastName: sender.last_name,
                        },
                        recipientInfo: {
                            accountType: recipient.account_type,
                            address: recipient.address,
                            debitUri: recipient_account_uri,
                            firstName: recipient.first_name,
                            lastName: recipient.last_name,
                        },
                    },
                },
                { upsert: true },
            );
        } catch (error) {
            console.log('----- transaction save error: ', error.message);
        }

        return res.status(response.status).send(response.data);
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
    const url = MASTERCARD_BASEURL + PARTNER_ID + `/transfers/${id}`;
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

export const accountVerify = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;
    const url =
        MASTERCARD_BASEURL + PARTNER_ID + '/accounts/account-verification';
    const authHeader = generateAuthHeader(
        url,
        'POST',
        JSON.stringify(data),
        CONSUMER_KEY,
        SIGNING_KEY,
    );
    try {
        const response = await Axios.post(url, data, {
            headers: {
                Authorization: authHeader,
            },
        });
        res.status(response.status).send(response.data);
    } catch (err) {
        return next(err);
    }
};
