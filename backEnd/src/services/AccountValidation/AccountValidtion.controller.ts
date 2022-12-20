import { Request, Response } from "express";
import InitAccountValidation from "./InitAccountValidation";

export default class AccountValidationController {
  async InitAccountValidation(req: Request, res: Response) {
    const { email } = req.body;
    const initAccountValidationService = new InitAccountValidation();
    const token = await initAccountValidationService.execute(email);

    return res.status(201).json({ token });
  }
}