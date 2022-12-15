import { Router } from 'express';

import SubcriptionController from '../services/Subscriptions/Subscription.controller';

const subscriptionController = new SubcriptionController();

const router = Router();

router.post('/create', (req, res) => subscriptionController.handle(req, res));

export default router;
