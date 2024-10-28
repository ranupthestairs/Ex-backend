import { Router } from 'express';
import * as transactionController from '../controller/transaction.controller';

const routes = Router();

routes.get('/status/:id', transactionController.getTransactionStatusById);

export default routes;
