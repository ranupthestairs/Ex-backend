import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    const authHeader = req.headers['authorization'];
    console.log('---- authHeader: ', authHeader);
    // const token = authHeader && authHeader.split(' ')[1];
    // if(token == null) return res.sendStatus(401);
    if(authHeader == null) return res.sendStatus(401);

    const result = jwt.verify(authHeader, JWT_SECRET);
    req.body.email = result.email;
    console.log(result);
    next();
    return '0';
}