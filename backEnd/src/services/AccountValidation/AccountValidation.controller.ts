import { Request, Response } from "express";
import SendEmail from "../../utils/SendEmail";
import InitRecoverPassword from "./InitRecoverPassword";

export default class AccountValidationController {

  constructor(
    private sendEmailService = new SendEmail(),
    private initRecoverService = new InitRecoverPassword(),
  ) {}

  async sendEmailValidation(req: Request, res: Response) {
    const { email } = req.body;
  }

  async initPasswordRecover(req: Request, res: Response) {
    const { email } = req.body;
    const token = await  this.initRecoverService.execute(email);
    await this.sendEmailService.execute(email, token, );
    res.status(201).json({  });
  }
}