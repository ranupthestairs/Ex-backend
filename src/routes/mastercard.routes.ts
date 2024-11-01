import { Router } from 'express';
import * as mastercardController from '../controller/mastercard.controller';

const routes = Router();

routes.post('/payment', mastercardController.createTransaction);
routes.get('/status/:id', mastercardController.getTransactionStatusById);

export default routes;
