import { Request, Response } from "express";
import CustomError from "../../utils/StatusError";
import InitAccountValidation from "./InitAccountValidation";

export default class AccountValidationController {
  async InitAccountValidation(req: Request, res: Response) {
    const { email } = req.body;
    if(!email.length) throw new CustomError('Email inválido', 400);
    const initAccountValidationService = new InitAccountValidation();
    const token = await initAccountValidationService.execute(email);

    return res.status(201).json({ token });
  }
}