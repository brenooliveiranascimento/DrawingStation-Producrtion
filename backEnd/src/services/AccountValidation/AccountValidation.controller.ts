import { Request, Response } from "express";
import InitRecoverPassword from "./InitRecoverPassword";

export default class AccountValidationController {

  constructor(
    private initRecoverService = new InitRecoverPassword(),
  ) {}

  async sendEmailValidation(req: Request, res: Response) {
    const { email } = req.body;
  }

  async initPasswordRecover(req: Request, res: Response) {
    const { email } = req.body;
    await  this.initRecoverService.execute(email);
    res.status(201).json({ message: 'Token de recuperação enviado para seu Email, confira sua caixa de entrada e seu spam.' });
  }
}