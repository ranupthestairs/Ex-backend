import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export const authenticateToken = async (
    req: Request,
    res: Response,
    next: Function,
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, email) => {
        if (err) return res.sendStatus(403);
        req.body.email = email;
        next();
    });

}