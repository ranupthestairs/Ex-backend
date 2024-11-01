import { Request, Response } from 'express';
import User from '../models/user.model';


export const getBillinginfo = async (
    req: Request,
    res: Response,
) => {
    try{
        // console.log(req.body.email);
        const user = await User.findOne(
            { email: req.body.email },
            { _id: false},
        );
        // console.log(user);
        return res.status(200).send({
            user,
            message: "success"
        });
    } catch(error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export const addBillinginfo = async (
    req: Request,
    res: Response,
) => {
    try{
        const existed = await User.findOne({ email: req.body.email });
        if (existed) {
            await User.findOneAndUpdate(
                { email: req.body.email },
                { 
                    $set: {
                        accountType: req.body.account_type,
                        address: req.body.address,
                        debitUri: req.body.sender_account_uri,
                    }
                },
                { upsert: true },
            );

            return res.status(200).send({
                message: "success"
            });
        }else{
            return res.status(200).send({
                message: "user doesn't exist"
            });
        }
    }catch(error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
}

export const updateBillinginfo = async (
    req: Request,
    res: Response,
) => {
    console.log(req.body);
    return res.status(200).send({
        message: "success"
    });
}

export const deleteBillinginfo = async (
    req: Request,
    res: Response,
) => {
    console.log(req.body);
    return res.status(200).send({
        message: "success"
    });
}