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
routes.get('/sub/:id', moduleController.getSubModuleById);
routes.get('/classrooms', moduleController.getClassrooms);

routes.use(validateAdm);

routes.post('/classrooms',
  validationClassroom,
  validationClassroomData,
  classRoomController.addNewClassroom);

routes.put('/classrooms/:id',
  validationClassroom,
  validationClassroomData,
  classRoomController.updateClassroom);
routes.delete('/classrooms/:id', classRoomController.deleteClassroom);

routes.post('/', validationModule, moduleController.addNewModule);
routes.delete('/:id', validationModule, moduleController.deleteModule);
routes.put('/:id', validationModule, moduleController.updateModule);

export default routes
