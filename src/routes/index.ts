import { Router } from 'express';

import transactionRoutes from './transaction.routes';
import mastercardRoutes from './mastercard.routes';
import authRoutes from './auth.routes';
import billinginfoRoutes from './billinginfo.routes';

import { authenticateToken } from '../middleware';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/transaction', authenticateToken, transactionRoutes);
routes.use('/mastercard', authenticateToken, mastercardRoutes);
routes.use('/billinginfo', authenticateToken, billinginfoRoutes);

export { routes };
