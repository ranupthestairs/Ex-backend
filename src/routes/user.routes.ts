import { Router } from 'express';
import { requireAuth, upload } from '../middleware';
import * as userController from '../controller/user.controller';

const routes = Router();

routes.get('/transactions', userController.getUserTransactions);
routes.get('/info', requireAuth, userController.getFullUserDetail);
routes.post(
    '/verify-account',
    requireAuth,
    userController.resendVerificationEmail,
);
routes.post(
    '/avatar',
    requireAuth,
    upload.single('image'),
    userController.updateUserProfileImage,
);
routes.post('/info', requireAuth, userController.updateUserInfo);

export default routes;
