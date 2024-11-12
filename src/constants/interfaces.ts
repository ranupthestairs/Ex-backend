import { Request } from 'express';

export interface RequestWithAuth extends Request {
    email: string;
    sub: string;
}

export interface LoginRequest extends Request {
    isFollowedLogin?: boolean;
}
