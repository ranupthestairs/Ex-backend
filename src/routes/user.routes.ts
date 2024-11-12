import { Router } from 'express';
import { requireAuth } from '../middleware';
import * as userController from '../controller/user.controller';

const routes = Router();

routes.get('/transactions', userController.getUserTransactions);
routes.post(
    '/verify-account',
    requireAuth,
    userController.resendVerificationEmail,
);

export default routes;
