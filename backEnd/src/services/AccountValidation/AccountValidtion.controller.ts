import { Request, Response } from "express";
import CustomError from "../../utils/StatusError";
import CodeValidate from "./CodeValidate";
import InitAccountValidation from "./InitAccountValidation";

export default class AccountValidationController {
  async InitAccountValidation(req: Request, res: Response) {
    const { email } = req.body;
    if(!email.length) throw new CustomError('Email inválido', 400);
    const initAccountValidationService = new InitAccountValidation();
    const token = await initAccountValidationService.execute(email);

    return res.status(201).json({ token });
  }

  async codeValidation(req: Request, res: Response) {
    const { code } = req.body;
    console.log(code)
    const token = req.header('Authorization') as string;
    if(!code) throw new CustomError('Código inválido', 400);
    const codeValidateService = new CodeValidate();
    await codeValidateService.execute(code, token);

    return res.status(201).json({ message: true });
  }
}
