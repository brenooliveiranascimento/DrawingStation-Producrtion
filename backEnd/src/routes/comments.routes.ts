import { Router } from 'express';

import CommentController from "../controllers/Comments.controller";
import CommentsServices from "../services/Comments.services";

const commentServices = new CommentsServices();
const commentControlelr = new CommentController(commentServices);

const router = Router();

router.get('/all', (req, res) => commentControlelr.getAll(req, res))

export default router;
