import { Request, Response } from "express";
import CustomError from "../../utils/StatusError";
import InitRecoverPassword from "./InitRecoverPassword";
import ValidateRecoverPasswordCode from "./ValidadeRecoverPasswordCode";

export default class AccountValidationController {

  constructor(
    private initRecoverService = new InitRecoverPassword(),
    private finishRecoverService = new ValidateRecoverPasswordCode(),
  ) {}

  async initPasswordRecover(req: Request, res: Response) {
    const { email } = req.body;
    const token = await  this.initRecoverService.execute(email);
    res.status(201).json({ token });
  }

  async finishPasswordRecover(req: Request, res: Response) {
    const { code, newPassword } = req.body
    if(newPassword.length < 6) throw new CustomError('Senha deve ter pelo menos 6 caracteres', 404);
    const token = req.header('Authorization') as string;
    const update = await this.finishRecoverService.execute(token, code, newPassword);
    res.status(201).json({ message: update });
  }
}