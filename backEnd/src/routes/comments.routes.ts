import { Router } from 'express';
import validateToken from '../middlewares/tokenVerification';

import CommentController from "../services/Comments/Comments.controller";
import CreateComment from '../services/Comments/CreateComment';
import GetCommentsServices from "../services/Comments/GetAllComments";
import InactiveComment from '../services/Comments/InactiveComment';
import UpdateComment from '../services/Comments/UpdateComment';

const commentsServices = {
  getAll: new GetCommentsServices(),
  create: new CreateComment(),
  update: new UpdateComment(),
  delete: new InactiveComment(),
}

const commentControlelr = new CommentController(commentsServices);

const router = Router();
router.use(validateToken);

router.get('/all/:id', (req, res) => commentControlelr.getAll(req, res));
router.post('/create', (req, res) => commentControlelr.create(req, res));
router.put('/update/:id', (req, res) => commentControlelr.update(req, res));
router.put('/delete/:id', (req, res) => commentControlelr.delete(req, res));

export default router;
