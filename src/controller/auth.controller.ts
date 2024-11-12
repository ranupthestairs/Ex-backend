import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
// import VerificationCode from '../models/verificationCode.model';
// import { sendmail } from '../utils';
import { LoginRequest } from 'src/constants/interfaces';
import { JWT_EXPIRATION_TIME, JWT_SECRET } from '../constants';

export const signup = async (req: LoginRequest, res: Response) => {
    try {
        const profile = req.body;

        const existAccount = await User.findOne({ email: profile.email });
        if (existAccount) {
            return res.status(422).send({
                message: 'Email already in use',
            });
        }

        // const newUser =
        const newUser = await User.create(profile);

        // const code = Math.floor(10000 + Math.random() * 90000);

        // await VerificationCode.create({
        //     user: newUser._id,
        //     code: code,
        //     expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        // });

        // await sendmail(
        //     profile.email,
        //     "CONFIRM_EMAIL",
        //     { name: profile.firstName, code: code.toString()},
        //     "NOTIFICATION"
        // )

        if (req.isFollowedLogin) {
            return newUser;
        }
        return res
            .status(200)
            .send({ message: 'Account created successfully' });
    } catch (err) {
        console.log('---- auth controller signup error: ', err);
        if (req.isFollowedLogin) throw new Error(err);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export const login = async (req: LoginRequest, res: Response) => {
    const profile = req.body;
    const user = await User.findOne({ email: profile.email });

    try {
        if (!user) {
            req.isFollowedLogin = true;
            await signup(req, res);
        }

        const token = jwt.sign({ email: profile.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION_TIME,
        });
        return res.status(200).send({
            message: 'Login successful',
            token: `Bearer ${token}`,
            user: user,
        });
    } catch (error) {
        console.log('---- auth controller login error: ', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};
