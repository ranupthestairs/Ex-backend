import { Router } from 'express';

import transactionRoutes from './transaction.routes';
import mastercardRoutes from './mastercard.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.use('/transaction', transactionRoutes);
routes.use('/mastercard', mastercardRoutes);
routes.use('/auth', authRoutes);

export { routes };
