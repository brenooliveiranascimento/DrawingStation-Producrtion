import { Router } from 'express';
import validateToken from '../middlewares/tokenVerification';

import SubcriptionController from '../services/Subscriptions/Subscription.controller';

const subscriptionController = new SubcriptionController();

const router = Router();

router.use(validateToken);

router.post('/create', (req, res) => subscriptionController.initSubscription(req, res));
router.post('/portal/:userId', (req, res) => subscriptionController.initPortal(req, res));

export default router;
