import { Response } from 'express';
import { RequestWithAuth } from 'src/constants/interfaces';
import Transaction from '../models/transaction.model';
import axios from 'axios';
import {
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN,
} from '../constants';

const BASE_AUTH0_DOMAIN = `https://${AUTH0_DOMAIN}/api/v2`;

export const getUserTransactions = async (
    req: RequestWithAuth,
    res: Response,
) => {
    const { email } = req;
    Transaction.find({ from: email })
        .then((transactions) => {
            res.status(200).send({ transactions });
        })
        .catch((err) => {
            res.status(500).send({ error: err.message });
        });
};

export const resendVerificationEmail = async (
    req: RequestWithAuth,
    res: Response,
) => {
    const { sub } = req;
    if (!sub) {
        return res.status(401).send({ message: 'User is not found!' });
    }

    try {
        const tokenResponse = await axios.post(
            `https://${AUTH0_DOMAIN}/oauth/token`,
            {
                client_id: AUTH0_CLIENT_ID,
                client_secret: AUTH0_CLIENT_SECRET,
                audience: `${BASE_AUTH0_DOMAIN}/`,
                grant_type: 'client_credentials',
            },
            { headers: { 'Content-Type': 'application/json' } },
        );

        const accessToken = tokenResponse?.data?.access_token || '';
        if (!accessToken) {
            return res
                .status(401)
                .send({ message: 'Fail to get Auth0 access token' });
        }

        const authHeader = {
            headers: { Authorization: `Bearer ${accessToken}` },
        };

        const userResponse = await axios.get(
            `${BASE_AUTH0_DOMAIN}/users/${sub}`,
            authHeader,
        );

        const { email_verified } = userResponse.data || {};
        if (email_verified) {
            return res
                .status(401)
                .send({ message: 'Email is already verified!' });
        }

        await axios.post(
            `${BASE_AUTH0_DOMAIN}/jobs/verification-email`,
            { user_id: sub },
            authHeader,
        );

        return res.status(200).send({
            message: 'Verification email successfully sent!',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Failed to send verification email!',
        });
    }
};
