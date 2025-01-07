import { NextFunction, Response } from 'express';
import { RequestWithAuth } from '../constants';
import request from 'request';
import { generateVisaAuthHeader } from '../utils';

export const helloWorld = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const options = generateVisaAuthHeader('/vdp/helloworld');

    console.log('debug here', data)
    try {
        request.get(options, (err, response, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${response.statusCode}`);
            console.log(body);
            return res.status(response.statusCode).send(body)
        });
    } catch (err) {
        return next(err)
    }
};

export const createTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const pullData = {
        "acquirerCountryCode": data['acquirerCountryCode'],
        "acquiringBin": data['acquiringBin'],
        "amount": data['amount'],
        "businessApplicationId": data['businessApplicationId'],
        "cardAcceptor": data['cardAcceptor'],
        "localTransactionDateTime": data['localTransactionDateTime'],
        "pointOfServiceData": data['pointOfServiceData'],
        "senderCurrencyCode": data['senderCurrencyCode'],
        "senderPrimaryAccountNumber": data['senderPrimaryAccountNumber'],
        "senderCardExpiryDate": data['senderCardExpiryDate'],
        "systemsTraceAuditNumber": data['systemsTraceAuditNumber'],
        "retrievalReferenceNumber": data['retrievalReferenceNumber'],
        "transactionIdentifier": data['transactionIdentifier'],
    };

    const pushData = {
        "acquirerCountryCode": data['acquirerCountryCode'],
        "acquiringBin": data['acquiringBin'],
        "amount": data['amount'],
        "businessApplicationId": data['businessApplicationId'],
        "cardAcceptor": data['cardAcceptor'],
        "localTransactionDateTime": data['localTransactionDateTime'],
        "retrievalReferenceNumber": data['retrievalReferenceNumber'],
        "systemsTraceAuditNumber": data['systemsTraceAuditNumber'],
        "transactionCurrencyCode": data['transactionCurrencyCode'],
        "senderName": data['senderName'],
        "recipientName": data['recipientName'],
        "recipientPrimaryAccountNumber": data['recipientPrimaryAccountNumber'],
        "recipientCardExpiryDate": data['recipientCardExpiryDate'],
        "transactionIdentifier": data['transactionIdentifier'],
    }

    const pullfundOptions = generateVisaAuthHeader('/visadirect/fundstransfer/v1/pullfundstransactions', pullData);
    const pushfundOptions = generateVisaAuthHeader('/visadirect/fundstransfer/v1/pushfundstransactions', pushData);

    console.log('debug here', data)
    try {
        request.post(pullfundOptions, (err, response, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${response.statusCode}`);
            console.log(body);
            
            if (response.statusCode < 500) {
                return res.status(response.statusCode).send(
                    {
                        ...body,
                        "message": "Pullfund transaction failed"
                    }
                );
            } else {
                request.post(pushfundOptions, (err, response, body) => {
                    if (err) {
                        return console.log(err);
                    }
                    console.log(`Status: ${response.statusCode}`);
                    console.log(body);
                    if (response.statusCode < 500 ) {

                        // reverse funds transaction
                        return res.status(response.statusCode).send(
                            {
                                ...body,
                                "message": "Pushfund transaction failed"
                            }
                        )
                    }
                });
            }
        });
        
    } catch (err) {
        return next(err)
    }
}

export const pullFundTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const options = generateVisaAuthHeader('/visadirect/fundstransfer/v1/pullfundstransactions',data);

    console.log('debug here', data)
    try {
        request.post(options, (err, response, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${response.statusCode}`);
            console.log(body);
            return res.status(response.statusCode).send(body)
        });
    } catch (err) {
        return next(err)
    }
};

export const pushFundTransaction = async (
    req: RequestWithAuth,
    res: Response,
    next: NextFunction,
) => {
    const data = req.body;

    const options = generateVisaAuthHeader('/visadirect/fundstransfer/v1/pushfundstransactions',data);

    console.log('debug here', data)
    try {
        request.post(options, (err, response, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${response.statusCode}`);
            console.log(body);
            return res.status(response.statusCode).send(body)
        });
    } catch (err) {
        return next(err)
    }
};