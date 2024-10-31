import { Router } from 'express';

import transactionRoutes from './transaction.routes';
import mastercardRoutes from './mastercard.routes';

const routes = Router();

routes.use('/transaction', transactionRoutes);
routes.use('/mastercard', mastercardRoutes);

export { routes };
