import { Router } from "express";
import AccountValidationController from "../services/AccountValidation/AccountValidation.controller";
const router = Router();

const accountValidationController = new AccountValidationController();

router.post('/sendAccountValidation', (req, res) => accountValidationController
  .sendEmailValidation(req, res));

export default router;
