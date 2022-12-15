import { hash } from "bcryptjs";
import Users from "../../database/models/UserModel";
import { UserGoogleCredentials } from "../../interfaces/userTypes";
import { errorMapTypes } from "../../utils/errorMap";

export default class RegisterWithGoogle {
  public async registerByGoogle(user: UserGoogleCredentials) {
    try {
      const { email, sub: password, picture, name } = user;
      const encriptedPassword = await hash(password, 8)
  
      const createNewUser = await Users.create({ 
        email,
        name,
        password: encriptedPassword,
        loginType: 'google',
        profilePhoto: picture,
        birthday: null,
        phoneNumber: null
       });
  
       return { error: null, message: createNewUser, type: 'Register' }
    } catch(e) {
      return { error: { message: errorMapTypes.REQUEST_ERROR }, message: errorMapTypes.REQUEST_ERROR }
    }
  };
}