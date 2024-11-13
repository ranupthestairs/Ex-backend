import axios, { AxiosRequestConfig } from 'axios';
import { Response } from 'express';
import { RequestWithAuth } from '../constants/interfaces';
import { fileUpload } from '../utils/firebase';
import {
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN,
} from '../constants';
import Transaction from '../models/transaction.model';

const BASE_AUTH0_DOMAIN = `https://${AUTH0_DOMAIN}/api/v2`;

const getAuth0AuthHeader = async (): Promise<AxiosRequestConfig<any>> => {
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

    const accessToken: string = tokenResponse?.data?.access_token || '';
    if (!accessToken) {
        throw new Error('Fail to get Auth0 access token');
    }

    const authHeader = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    return authHeader;
};

const getUserInfo = async (
    uid: string,
    authHeader?: AxiosRequestConfig<any>,
) => {
    const header = authHeader || (await getAuth0AuthHeader());
    const userResponse = await axios.get(
        `${BASE_AUTH0_DOMAIN}/users/${uid}`,
        header,
    );
    return userResponse.data || {};
};

const checkUsernameAvailability = async (
    username: string,
    authHeader?: AxiosRequestConfig<any>,
): Promise<boolean> => {
    const header = authHeader || (await getAuth0AuthHeader());
    const foundUsersResponse = await axios.get(
        `${BASE_AUTH0_DOMAIN}/users?q=username:"${username}"&search_engine=v3`,
        header,
    );

    const users = foundUsersResponse.data;
    return !users.length;
};

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
        return res.status(401).send({ message: 'User Not Found!' });
    }

    try {
        const authHeader = await getAuth0AuthHeader();
        const userInfo = await getUserInfo(sub, authHeader);

        const { email_verified } = userInfo;
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

export const getFullUserDetail = async (
    req: RequestWithAuth,
    res: Response,
) => {
    const { sub } = req;
    if (!sub) {
        return res.status(401).send({ message: 'User Not Found!' });
    }
    try {
        const userInfo = await getUserInfo(sub);
        return res.status(200).send({ userInfo });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Failed to send verification email!',
        });
    }
};

export const updateUserProfileImage = async (
    req: RequestWithAuth,
    res: Response,
) => {
    const { file } = req;
    if (!file) {
        return res.status(400).send({ message: 'Image Not Exist!' });
    }

    try {
        const downloadURL = await fileUpload(file, 'uploads/avatars/');

        req.body = { picture: downloadURL };

        return updateUserInfo(req, res);
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Failed to update user profile image!',
        });
    }
};

export const updateUserInfo = async (req: RequestWithAuth, res: Response) => {
    const { sub, body } = req;
    if (!sub) return res.status(401).send({ message: 'User Not Found!' });

    try {
        const authHeader = await getAuth0AuthHeader();
        if (body.username) {
            const usernameAvailability = await checkUsernameAvailability(
                body.username,
                authHeader,
            );
            if (!usernameAvailability) {
                return res
                    .status(401)
                    .send({ message: 'Username is already taken!' });
            }
        }
        const response = await axios.patch(
            `${BASE_AUTH0_DOMAIN}/users/${sub}`,
            body,
            authHeader,
        );
        return res.status(200).send({ userInfo: response.data });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message || 'Failed to update user information!',
        });
    }
};
