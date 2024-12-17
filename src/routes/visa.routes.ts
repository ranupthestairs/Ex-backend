import { Router } from 'express';
import * as visaController from '../controller/visa.controller';
// import { requireAuth } from '../middleware';

const routes = Router();

routes.post('/payment',  visaController.createTransaction);

export default routes;
