import { Router } from 'express';
import * as mastercardController from '../controller/mastercard.controller';

const routes = Router();

// routes.post('/payment', '');
routes.get('/status/:id', mastercardController.getTransactionStatusById);
// routes.get('/status/:tid', '');

export default routes;
