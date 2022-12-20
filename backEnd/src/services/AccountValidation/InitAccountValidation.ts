import AuthValidationModel from "../../database/models/AuthValidationModel";
import UsersModel from "../../database/models/UserModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from 'jsonwebtoken';
import { transporter } from "../../utils/transporter";

export default class InitAccountValidation {

  private createCode() {
    let code = '';
    for(let index = 1; index <= 10; index += 1) {
      const randomvalue = Math.floor(Math.random() * 10);
      code += randomvalue;
    }
    return Number(code);
  }

  private sendMessage(code: number, email: string) {
    transporter.sendMail({
      from: 'DrawingStation Validação de conta <accountvalidation@drawingstation.com.br>',
      to: email,
      subject: 'Validação de conta',
      html: `<div><h1>Olá desenista!!<h1/><p>Este é o seu código de validação!
      Não o mostre para niguém! válido por 1 hora<br/> <strong>${code}<strong><p><div>`
  });
  }

  async execute(email: string) {
    const user = await UsersModel.findOne({ where: { email } });
    if(user) throw new CustomError(errorMapTypes.USER_ALREDY_EXISTS, 401);
    const checkAlredyExist = await AuthValidationModel.findOne({ where: { email } });
    if(checkAlredyExist) {
      await AuthValidationModel.destroy({where: { email } });
    }
    const code = this.createCode();
    const key = process.env.SECRET as string
    const token = jwt.sign({ email }, key, { expiresIn: '1h' });
    try {
      await AuthValidationModel.create({ email, code, token });
      this.sendMessage(code, email);
      return token;
    } catch(e: any) {
      console.log(e)
      throw new CustomError(errorMapTypes.REQUEST_ERROR, 500);
    }
  }
}