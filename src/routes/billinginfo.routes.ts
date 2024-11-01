import { Router } from 'express';
import * as billinginfoController from '../controller/billinginfo.controller';

const routes = Router();

routes.get('/get',billinginfoController.getBillinginfo);
routes.post('/add', billinginfoController.addBillinginfo);
routes.post('/update', billinginfoController.updateBillinginfo);
routes.post('/delete', billinginfoController.deleteBillinginfo);

export default routes;
