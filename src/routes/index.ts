import { Router } from 'express';

// import dexRoutes from './dex.routes';
// import casinoRoutes from './casino.routes';
// import airDropRoutes from './airdrop.routes';
import transactionRoutes from './transaction.routes';
import mastercardRoutes from './mastercard.routes';
// import signup from '../controller/signup.controller.ts';

const routes = Router();

// routes.use('/casino', casinoRoutes);
// routes.use('/dex', dexRoutes);
// routes.use('airdrop', airDropRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/mastercard', mastercardRoutes);
// routes.post('signup', signup);

export { routes };
