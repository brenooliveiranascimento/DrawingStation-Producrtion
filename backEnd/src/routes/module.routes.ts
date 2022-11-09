import express from 'express';
import validationModule from '../controllers/authValidation/moduleValidation';
import ClassroomsController from '../controllers/Classrooms.controller';
import { validationClassroom, validationClassroomData } from '../controllers/classroomvalidation/classroomValidation';
import ModuleController from '../controllers/Module.controller';
import validateAdm from '../middlewares/adm.middleware';
import validateToken from '../middlewares/tokenVerification';

const routes = express.Router();

const moduleController = new ModuleController();
const classRoomController = new ClassroomsController();

routes.use(validateToken);

routes.get('/', moduleController.getAllModules);
routes.get('/sub', moduleController.getAllSubModules);
routes.get('/classrooms', moduleController.getClassrooms);

routes.post('/classrooms',
  validateAdm,
  validationClassroom,
  validationClassroomData,
  classRoomController.addNewClassroom);
routes.post('/',validateAdm, validationModule, moduleController.addNewModule);
routes.delete('/:id',validateAdm,validationModule, moduleController.deleteModule);
routes.put('/:id',validateAdm, validationModule, moduleController.updateModule);

export default routes
