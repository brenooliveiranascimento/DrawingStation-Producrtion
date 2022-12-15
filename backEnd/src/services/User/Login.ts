import { compare } from "bcryptjs";
import { ILogin } from "../../interfaces/User/ILogin";
import { LoginResponse, UserCredentials } from "../../interfaces/userTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import CheckAlredyExist from "./CheckAlredyExist";

export default class Login {

  constructor(private checkAlredyExist = new CheckAlredyExist()) {}

  public async login(userCredential: UserCredentials): Promise<ILogin> {
    const { email, password } = userCredential;
    const userData = await this.checkAlredyExist.findAUser(email);

    const checkPassword = await compare(password, userData.password)

    if(!checkPassword) throw new CustomError(errorMapTypes.INCORRECT_PASSWORD, 402);
    
    return { message: userData }
  }
}