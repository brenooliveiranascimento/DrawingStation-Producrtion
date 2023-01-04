import { Router } from 'express';
import NotificationController from '../services/notification/NotificationController';

const router = Router()

const notificationController = new NotificationController();

router.get('/', (req, res) => notificationController.get(req, res));

export default router;
