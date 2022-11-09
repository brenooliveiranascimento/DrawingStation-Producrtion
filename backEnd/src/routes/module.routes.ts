import express from 'express';
import ModuleController from '../controllers/Module.controller';
import validateToken from '../middlewares/tokenVerification';

const routes = express.Router();

const moduleController = new ModuleController();

routes.use(validateToken);

routes.get('/', moduleController.getAll);
routes.get('/free', moduleController.getAllFree);

export default routes
