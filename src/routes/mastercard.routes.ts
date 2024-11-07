import { Router } from 'express';
import * as mastercardController from '../controller/mastercard.controller';
import { requireAuth } from '../middleware';

const routes = Router();

routes.post('/payment', requireAuth, mastercardController.createTransaction);
routes.get('/status/:id', mastercardController.getTransactionStatusById);

export default routes;
