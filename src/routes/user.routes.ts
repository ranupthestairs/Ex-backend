import { Router } from 'express';
import * as userController from '../controller/user.controller';

const routes = Router();

routes.get('/transactions', userController.getUserTransactions);

export default routes;
