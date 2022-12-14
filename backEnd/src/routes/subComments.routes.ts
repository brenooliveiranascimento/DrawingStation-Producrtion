import { Router } from 'express';
import SubCommentControlelr from '../services/SubComments/SubComment.controller';
import CreateSubComment from '../services/SubComments/CreateSubComment';
import UpdateSubComment from '../services/SubComments/UpdateSubComment';
import DeleteSubComment from '../services/SubComments/DeleteSubComment';

const router = Router();

const subCommentServices = {
  create: new CreateSubComment(),
  update: new UpdateSubComment(),
  delete: new DeleteSubComment(),
}

const subCommentControlelr = new SubCommentControlelr(subCommentServices);

router.post('/create', (req, res) => subCommentControlelr.create(req, res));
router.post('/update/:id', (req, res) => subCommentControlelr.update(req, res));
router.delete('/delete/:id', (req, res) => subCommentControlelr.delete(req, res));

export default router;
