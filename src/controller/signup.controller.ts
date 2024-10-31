import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';

export const signup = async (
    req: Request,
    res: Response,
    Next: NextFunction
) => {
    const { firstName, lastName, email, password} = await req.body();

    const existAccount = await User.findOne({ email });
    if (existAccount) {
        return res.status(422).send({
            message: "Email already in use",
        })
    }

    

}