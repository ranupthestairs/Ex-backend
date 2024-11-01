import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import VerificationCode from '../models/verificationCode.model';
import { sendmail } from '../utils';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';


export const signup = async (
    req: Request,
    res: Response,
    Next: NextFunction
) => {
    try{
        const { firstName, lastName, email, password} = await req.body();

        const existAccount = await User.findOne({ email });
        if (existAccount) {
            return res.status(422).send({
                message: "Email already in use",
            })
        }

        const newUser = await User.create({
            firstName: firstName,
            lastName, lastName,
            email, email,
            password, password,
        });

        const code = Math.floor(10000 + Math.random() * 90000);

        await VerificationCode.create({
            user: newUser._id,
            code: code,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        await sendmail(
            email,
            "CONFIRM_EMAIL",
            { name: firstName, code: code.toString()},
            "NOTIFICATION"
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }

}

export const login = async (
    req: Request,
    res: Response,
    Next: NextFunction
) => {
    const { email, password } = await req.body();
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({
            message: "User not found",
        });
    }

    try{
        if (user.password == password) {
            const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: '24h' });
            return res.status(200).send({
                message: "Login successful",
                token: token,
            });
        } else {
            return res.status(401).send({
                message: "Invalid password",
            });
        }
    } catch(error) {
        console.log(error);
        return res.status(500).send({
            message: "Internal Server Error",
        });
    }

}