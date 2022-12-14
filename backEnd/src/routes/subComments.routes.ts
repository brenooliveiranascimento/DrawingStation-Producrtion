import { Router } from 'express';
import SubCommentControlelr from '../services/SubComments/SubComment.controller';
import CreateSubComment from '../services/SubComments/CreateSubComment';

const router = Router();

const subCommentServices = {
  create: new CreateSubComment(),
}

const subCommentControlelr = new SubCommentControlelr(subCommentServices);

router.post('/create', (req, res) => subCommentControlelr.create(req, res));

export default router;
