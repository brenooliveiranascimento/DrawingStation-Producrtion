import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';
import validationCredentials from '../controllers/authValidation/credentialValidation';
import UserController from '../controllers/Autentication.controller';
import validateToken from '../middlewares/tokenVerification';
import RecoverAccountController from "../services/RecoverAccount/RecoverAccount.controller";

const routes = express.Router();

const userController = new UserController();
const accountValidationController = new RecoverAccountController();

routes.post('/recoverPassword', (req, res) => accountValidationController
  .initPasswordRecover(req, res));
routes.post('/recoverPasswordFinish', (req, res) => accountValidationController
  .finishPasswordRecover(req, res));
routes.post('/me', validateToken, userController.getUserData);
routes.post('/adm', validateToken, userController.getAdm);
routes.post('/register', validationUser, userController.create);
routes.post('/login', validationCredentials, userController.login);
routes.post('/google', userController.loginByGoogle);


export default routes;
