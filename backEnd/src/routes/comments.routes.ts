import { Router } from 'express';

import CommentController from "../services/Comments/Comments.controller";
import CreateComment from '../services/Comments/CreateComment';
import GetCommentsServices from "../services/Comments/GetAllComments";

const commentsServices = {
  getAllComments: new GetCommentsServices(),
  createComment: new CreateComment(),
}

const commentControlelr = new CommentController(commentsServices);

const router = Router();

router.get('/all', (req, res) => commentControlelr.getAll(req, res))
router.post('/create', (req, res) => commentControlelr.create(req, res))

export default router;
