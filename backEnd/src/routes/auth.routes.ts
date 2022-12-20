import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';
import validationCredentials from '../controllers/authValidation/credentialValidation';
import UserController from '../controllers/Autentication.controller';
import validateToken from '../middlewares/tokenVerification';
import RecoverAccountController from "../services/RecoverAccount/RecoverAccount.controller";
import AccountValidationController from '../services/AccountValidation/AccountValidtion.controller';

const routes = express.Router();

const userController = new UserController();
const recoverPasswordController = new RecoverAccountController();
const accountValidation = new AccountValidationController();

routes.post('/recoverPassword', (req, res) => recoverPasswordController
  .initPasswordRecover(req, res));
routes.post('/recoverPasswordFinish', (req, res) => recoverPasswordController
  .finishPasswordRecover(req, res));

routes.post('/validateEmail/init', accountValidation.InitAccountValidation);
routes.post('/validateEmail', accountValidation.codeValidation);

routes.post('/me', validateToken, userController.getUserData);
routes.post('/adm', validateToken, userController.getAdm);
routes.post('/register', validationUser, userController.create);
routes.post('/login', validationCredentials, userController.login);
routes.post('/google', userController.loginByGoogle);


export default routes;
