import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';
import validationCredentials from '../controllers/authValidation/credentialValidation';
import UserController from '../controllers/Autentication.controller';
import validateToken from '../middlewares/tokenVerification';
import AccountValidationController from "../services/AccountValidation/AccountValidation.controller";

const routes = express.Router();

const userController = new UserController();
const accountValidationController = new AccountValidationController();

routes.post('/me', validateToken, userController.getUserData);
routes.post('/adm', validateToken, userController.getAdm);
routes.post('/register', validationUser, userController.create);
routes.post('/login', validationCredentials, userController.login);
routes.post('/google', userController.loginByGoogle);
routes.post('/accountValidation', (req, res) => accountValidationController
  .sendEmailValidation(req, res));
  
export default routes;
