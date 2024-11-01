import { Router } from 'express';
import * as authController from '../controller/auth.controller';

const routes = Router();

routes.post('/signup', authController.signup);
routes.post('/login', authController.login);

export default routes;
