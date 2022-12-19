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

private createToken(email: string) {
  const key = process.env.SECRET as string
  const token = jwt.sign(email, key, { expiresIn: '1h' });
  return token;
};

async execute(email: string): Promise<string> {
  try { 
    const userExist = await UserModel.findOne({ where: { email } });

    if(!userExist) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 500);

    const token = this.createToken(email);

    await this.validateToken(token, email);

    await UserModel.update({ recoverPassword: token }, { where: { email } });

    transporter.sendMail({
        from: 'DrawingStation Recuperação de senha <accountvalidation@drawingstation.com.br>',
        to: email,
        subject: 'Recuperação de senha',
        html: `<h1>Olá desenhista!!<h1><p>Este é o seu token de acesso!<strong>${token}<strong><p>`
    })
    return token;
  } catch(e: any) {
    throw new CustomError(e.message, 500);
  }
}
}