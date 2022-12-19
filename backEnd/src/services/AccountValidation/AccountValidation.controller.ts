import { Request, Response } from "express";
import SendEmail from "./SendEmail";

export default class AccountValidationController {
  async sendEmailValidation(req: Request, res: Response) {
    const { email } = req.body;
    const sendEmailService = new SendEmail();
    const send = await sendEmailService.execute(email);
    res.status(201).json({message: send});
  }
}