import express from 'express';
import validationUser from '../controllers/authValidation/authValidation';

const routes = express.Router();

routes.post('/', validationUser);

export default routes;
