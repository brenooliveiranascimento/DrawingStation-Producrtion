import express from 'express';
import ModuleController from '../controllers/Module.controller';

const routes = express.Router();

const moduleController = new ModuleController();

routes.get('/', moduleController.getAll);

export default routes
