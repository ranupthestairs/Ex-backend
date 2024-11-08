import { Request, Response } from 'express';
import Transaction from '../models/transaction.model';

interface CustomRequest extends Request {
    email: string;
}

export const getUserTransactions = async (
    req: CustomRequest,
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
