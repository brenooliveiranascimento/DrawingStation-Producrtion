import express from 'express';
import validationModule from '../controllers/authValidation/moduleValidation';
import ModuleController from '../controllers/Module.controller';
import validateToken from '../middlewares/tokenVerification';

const routes = express.Router();

const moduleController = new ModuleController();

routes.use(validateToken);

routes.get('/', moduleController.getAllModules);
routes.post('/',validationModule, moduleController.addNewModule);
routes.delete('/:id', moduleController.deleteModule);
routes.get('/sub', moduleController.getAllSubModules);
routes.get('/classrooms', moduleController.getClassrooms);

export default routes
