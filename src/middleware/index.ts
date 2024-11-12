import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithAuth } from 'src/constants/interfaces';
import { JWT_SECRET } from '../constants';

export const requireAuth = async (
    req: RequestWithAuth,
    res: Response,
    next: Function,
) => {
    const authHeader = req.headers['authorization'];
    // console.log('---- authHeader: ', authHeader);
    // const token = authHeader && authHeader.split(' ')[1];
    // if(token == null) return res.sendStatus(401);
    if (authHeader == null) return res.sendStatus(401);

    try {
        const result = jwt.verify(
            authHeader.replace('Bearer ', ''),
            JWT_SECRET,
        );
        req.email = result.email;
        return next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid token' });
    }
};
