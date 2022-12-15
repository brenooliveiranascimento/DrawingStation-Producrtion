import { Router } from 'express';
import validateToken from '../middlewares/tokenVerification';

import SubcriptionController from '../services/Subscriptions/Subscription.controller';

const subscriptionController = new SubcriptionController();

const router = Router();
router.use(validateToken);

router.post('/create', (req, res) => subscriptionController.handle(req, res));

export default router;
