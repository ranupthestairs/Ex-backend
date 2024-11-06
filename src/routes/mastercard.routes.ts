import { Router } from 'express';
import * as mastercardController from '../controller/mastercard.controller';
import { authenticateToken } from '../middleware';

const routes = Router();

routes.post('/payment', authenticateToken, mastercardController.createTransaction);
routes.get('/status/:id', mastercardController.getTransactionStatusById);

export default routes;
