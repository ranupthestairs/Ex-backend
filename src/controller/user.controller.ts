import { Response } from 'express';
import { RequestWithAuth } from 'src/constants/interfaces';
import Transaction from '../models/transaction.model';

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
