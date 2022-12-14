import { Router } from 'express';

import CommentController from "../services/Comments/Comments.controller";
import GetCommentsServices from "../services/Comments/GetAllComments";

const commentsServices = {
  getAllComments: new GetCommentsServices(),
}

const commentControlelr = new CommentController(commentsServices);

const router = Router();

router.get('/all', (req, res) => commentControlelr.getAll(req, res))

export default router;
