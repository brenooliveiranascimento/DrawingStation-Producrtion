import { Router } from 'express';

import CommentController from "../services/Comments/Comments.controller";
import CreateComment from '../services/Comments/CreateComment';
import GetCommentsServices from "../services/Comments/GetAllComments";
import UpdateComment from '../services/Comments/UpdateComment';

const commentsServices = {
  getAllComments: new GetCommentsServices(),
  createComment: new CreateComment(),
  updateComment: new UpdateComment(),
}

const commentControlelr = new CommentController(commentsServices);

const router = Router();

router.get('/all', (req, res) => commentControlelr.getAll(req, res));
router.post('/create', (req, res) => commentControlelr.create(req, res));
router.put('/update', (req, res) => commentControlelr.update(req, res));

export default router;
