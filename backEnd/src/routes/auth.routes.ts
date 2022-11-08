import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';
import validationCredentials from '../controllers/authValidation/credentialValidation';
import UserController from '../controllers/Autentication.controller';

const routes = express.Router();

const userController = new UserController();

routes.post('/', validationUser, userController.create);
routes.get('/',validationCredentials, userController.login);

export default routes;
