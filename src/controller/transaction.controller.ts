import { NextFunction, Request, Response } from "express";
import get from "axios";
import post from "axios";
import { APIKEY } from '../constants';

export const createTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;
    try {
        post('https://api.changenow.io/v2/fiat-transaction', data)
            .then((response) => {
                // validate the data

                res.status(200).send(response.data);
            })
            .catch((error) => {
                console.log('createTransaction Error:', error.message);
                    res.status(500).send({
                        message: 'Error',
                        error: error.message,
                    });
            })
        } catch (err) {
            return next(err);
        }
    }

export const getFiatTransactionStatusById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: 'Invalid parameter' });
    try {
        get('https://api.changenow.io/v2/fiat-status/' + id + `/${APIKEY}`)
            .then((response) => {
                console.log('Response:', response.data);
                res.status(200).send(response.data);
            })
            .catch((error) => {
                console.log('getTransactionStatusById Error:', error.message);
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            });
    } catch (err) {
        return next(err);
    }
}

export const getFiatToCryptoEstimate = async (
    req: Request,
    res: Response,
    next: NextFunction,    
) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: 'Invalid parameter' });
    try {
        get('https://api.changenow.io/v2/fiat-estimate/', {
            params: {
                "from_currency": "KGS",
                "from_network":'',
                "from_amount": 1200.24,
                "to_currency": "BTC",
                "to_network": '',
                "deposit_type": '',
                "payout_type": '',
            }
        }).then((response) => {
                console.log('Response:', response.data);
                res.status(200).send(response.data);
            })
            .catch((error) => {
                console.log('getTransactionStatusById Error:', error.message);
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            });
    } catch (err) {
        return next(err);
    }
}

// export const getCryptoToFiatEstimate = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,    
// ) => {

// }

export const getTransactionStatusById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: 'Invalid parameter' });
    try {
        get('https://api.changenow.io/v1/transactions/' + id + `/${APIKEY}`)
            .then((response) => {
                console.log('Response:', response.data);
                res.status(200).send(response.data);
            })
            .catch((error) => {
                console.log('getTransactionStatusById Error:', error.message);
                res.status(500).send({
                    message: 'Error',
                    error: error.message,
                });
            });
    } catch (err) {
        return next(err);
    }
}