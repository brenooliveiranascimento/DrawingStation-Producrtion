import { Router } from 'express';
import NotificationController from '../services/notification/NotificationController';

const router = Router()

const notificationController = new NotificationController();

router.get('/get/:id', (req, res) => notificationController.get(req, res));
router.post('/create', (req, res) => notificationController.create(req, res));
router.post('/update/:id', (req, res) => notificationController.update(req, res));
router.delete('/delete/one', (req, res) => notificationController.deleteOne(req, res));
router.delete('/delete/all', (req, res) => notificationController.deleteAll(req, res));

export default router;
