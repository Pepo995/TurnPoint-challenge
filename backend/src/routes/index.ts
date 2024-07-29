import express from 'express';
import clientsRouter from './clients';

const router = express.Router();

router.use('/clients', clientsRouter);

export default router;
