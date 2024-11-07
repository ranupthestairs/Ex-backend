import { Router } from 'express';

import transactionRoutes from './transaction.routes';
import mastercardRoutes from './mastercard.routes';
import authRoutes from './auth.routes';
import billinginfoRoutes from './billinginfo.routes';
import userRoutes from './user.routes';

import { requireAuth } from '../middleware';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/transaction', requireAuth, transactionRoutes);
routes.use('/mastercard', mastercardRoutes);
// routes.use('/mastercard', requireAuth, mastercardRoutes);
routes.use('/billinginfo', requireAuth, billinginfoRoutes);
routes.use('/user', requireAuth, userRoutes);

export { routes };
