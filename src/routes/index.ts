import { Router } from 'express';

import transactionRoutes from './transaction.routes';
import mastercardRoutes from './mastercard.routes';
// import signup from '../controller/signup.controller.ts';

const routes = Router();

routes.use('/transaction', transactionRoutes);
routes.use('/mastercard', mastercardRoutes);
// routes.post('signup', signup);

export { routes };
