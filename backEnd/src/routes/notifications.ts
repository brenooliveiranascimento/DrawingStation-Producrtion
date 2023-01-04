import { Router } from 'express';
import NotificationController from '../services/notification/NotificationController';

const router = Router()

const notificationController = new NotificationController();

router.get('/get/:id', (req, res) => notificationController.get(req, res));
router.post('/create', (req, res) => notificationController.create(req, res));
router.post('/update/:id', (req, res) => notificationController.update(req, res));

export default router;
