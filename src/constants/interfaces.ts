import { Request } from 'express';

export interface RequestWithAuth extends Request {
    email: string;
}

export interface LoginRequest extends Request {
    isFollowedLogin?: boolean;
}
