import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';
import UserController from '../controllers/User.controller';

const routes = express.Router();

const userController = new UserController();

routes.post('/', validationUser, userController.create);

export default routes;
