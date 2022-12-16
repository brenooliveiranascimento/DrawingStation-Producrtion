import { Router } from 'express';
import validateToken from '../middlewares/tokenVerification';

import SubcriptionController from '../services/Subscriptions/Subscription.controller';

const subscriptionController = new SubcriptionController();

const router = Router();

router.use(validateToken);

router.post('/create', (req, res) => subscriptionController.init(req, res));
router.post('/portal/:userId', (req, res) => subscriptionController.portal(req, res));

export default router;
