import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
// import VerificationCode from '../models/verificationCode.model';
// import { sendmail } from '../utils';
import { JWT_SECRET, JWT_EXPIRATION_TIME } from '../constants';

export const signup = async (req: Request, res: Response) => {
    try {
        const profile = req.body;

        const existAccount = await User.findOne({ email: profile.email });
        if (existAccount) {
            return res.status(422).send({
                message: 'Email already in use',
            });
        }

        // const newUser =
        await User.create({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            password: profile.password,
        });

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

        return res
            .status(200)
            .send({ message: 'Account created successfully' });
    } catch (err) {
        console.log('---- auth controller signup error: ', err);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const profile = req.body;
    const user = await User.findOne({ email: profile.email });
    if (!user) {
        return await signup(req, res);
    }

    try {
        if (user.password == profile.password) {
            const token = jwt.sign({ email: profile.email }, JWT_SECRET, {
                expiresIn: JWT_EXPIRATION_TIME,
            });
            return res.status(200).send({
                message: 'Login successful',
                token: token,
                user: user,
            });
        } else {
            return res.status(401).send({
                message: 'Invalid password',
            });
        }
    } catch (error) {
        console.log('---- auth controller login error: ', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};
