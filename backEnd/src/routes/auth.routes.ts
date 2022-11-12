import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';
import validationCredentials from '../controllers/authValidation/credentialValidation';
import UserController from '../controllers/Autentication.controller';
import validateToken from '../middlewares/tokenVerification';

const routes = express.Router();

const userController = new UserController();

routes.post('/me', validateToken, userController.getUserData);
routes.post('/adm', validateToken, userController.getAdm);
routes.post('/register', validationUser, userController.create);
routes.post('/login', validationCredentials, userController.login);
routes.post('/google', userController.loginByGoogle);

export default routes;
