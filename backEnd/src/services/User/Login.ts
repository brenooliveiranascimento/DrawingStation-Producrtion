import { compare } from "bcryptjs";
import { ICommentGenericReturn } from "../../interfaces/commentsTypes";
import { UserCredentials } from "../../interfaces/userTypes";
import { errorMapTypes } from "../../utils/errorMap";
import createToken from "../../utils/jwt.utils";
import CustomError from "../../utils/StatusError";
import CheckAlredyExist from "./CheckAlredyExist";

export default class Login {

  constructor(private checkAlredyExist = new CheckAlredyExist()) {}

  public async exwecute(userCredential: UserCredentials): Promise<ICommentGenericReturn> {
    const { email, password,  } = userCredential;
    const userData = await this.checkAlredyExist.findAUser(email);

    const checkPassword = await compare(password, userData.password)

    if(!checkPassword) throw new CustomError(errorMapTypes.INCORRECT_PASSWORD, 402);
    const token = createToken({email: userData.email, id: userData.id, profilePhoto: userData.profilePhoto, name: userData.name})
    
    return { message: token }
  }
}