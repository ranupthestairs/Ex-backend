import { Router } from 'express';
import * as visaController from '../controller/visa.controller';
// import { requireAuth } from '../middleware';

const routes = Router();

routes.get('/helloworld', visaController.helloWorld);
routes.post('/pullfund',  visaController.pullFundTransaction);
routes.post('/pushfund',  visaController.pushFundTransaction);

export default routes;
