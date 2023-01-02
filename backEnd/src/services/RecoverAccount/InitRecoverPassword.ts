import UserModel from "../../database/models/UserModel";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import jwt from "jsonwebtoken";
import statusCodes from "../../statusCode";
import { transporter } from "../../utils/transporter";

export default class InitRecoverPassword {

private async validateToken(token: string, email: string) {
  const key = process.env.SECRET as string

  if (!token) throw new CustomError(errorMapTypes.TOKEN_NOT_FOUND, statusCodes.UNAUTHORIZED);
  try {
    jwt.verify(token, key);
    return true
  } catch (err) {
    UserModel.update({ recoverPassword: null }, { where: { email } });
    throw new CustomError(errorMapTypes.REQUEST_ERROR, statusCodes.BAD_REQUEST);
  }
};

private async createToken(email: string) {
  const key = process.env.SECRET as string
  const token = jwt.sign({email}, key, { expiresIn: '1h' });
  return token;
};

private geterateCode() {
  let code = '';
  for (let index = 0; index <= 5; index += 1) {
    const random = Math.floor(Math.random() * 10);
    code += random;
  }
  return Number(code);
}

async execute(email: string): Promise<string> {
  try { 
    const userExist = await UserModel.findOne({ where: { email } });
    if(!userExist) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 500);
    if(userExist.loginType === 'google') throw new CustomError(`User logado pelo ${userExist.loginType}`, 500);
    const token = await this.createToken(email);
    const code = this.geterateCode();
    await this.validateToken(token, email);

    await UserModel.update({ recoverPasswordToken: token, recoverPasswordCode: code }, { where: { email } });

    transporter.sendMail({
        from: 'DrawingStation Recuperação de senha <accountvalidation@drawingstation.com.br>',
        to: email,
        subject: 'Recuperação de senha',
        html: `<div><h1>Olá desenista!!<h1/><p>Este é o seu token de recuperação de senha!
        Não o mostre para niguém! válido por 1 hora<br/> <strong>${code}<strong><p><div>`
    });

    return token;
  } catch(e: any) {
    console.log(e)
    throw new CustomError(e.message, 500);
  }
}
}