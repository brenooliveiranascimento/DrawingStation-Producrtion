import { Router } from 'express';
import SubCommentControlelr from '../services/SubComments/SubComment.controller';
import CreateSubComment from '../services/SubComments/CreateSubComment';
import UpdateSubComment from '../services/SubComments/UpdateSubComment';

const router = Router();

const subCommentServices = {
  create: new CreateSubComment(),
  update: new UpdateSubComment(),
}

const subCommentControlelr = new SubCommentControlelr(subCommentServices);

router.post('/create', (req, res) => subCommentControlelr.create(req, res));
router.post('/update/:id', (req, res) => subCommentControlelr.update(req, res));

export default router;
