import { Response, Request } from 'express';
import { UserCredentials, UserGoogleCredentials, UserInterface } from '../interfaces/userTypes';
import AuthService from '../services/Autentication.services';
import statusCodes from '../statusCode';
import createToken from '../utils/jwt.utils';
import jwt from 'jsonwebtoken'
import UserService from '../services/User.services';
import SignatureModel from '../database/models/SignatureModel';

class UserController {
  declare userData: Function
  constructor(private authService = new AuthService(), 
  private userService = new UserService()
  ) {
    this.userData = (userData: UserInterface) => ({
      email: userData.email,
      id: userData.id
    });
  }
  private key = process.env.SECRET as string

  public create = async (req: Request, res: Response) => {
    const user: UserCredentials = req.body;
    const { error, message } = await this.authService.register(user);

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});

    const token = createToken({email: user.email, id: message.id, profilePhoto: message.profilePhoto, name: message.name})
    return res.status(statusCodes.OK)
      .json({
        message: 'Usuário cirado com sucesso',
        token,
        error: false,
        email: user.email,
        id: message.id,
        name: message.name,
        profilePhoto: message.profilePhoto,
        birthday: message.birthday,
        phoneNumber: message.phoneNumber,
      });
  }

  public login = async (req: Request, res: Response) => {
    const user: UserCredentials = req.body;
    const { error, message } = await this.authService.login(user)

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});
      
    const token = createToken({email: user.email, id: message.id, profilePhoto: message.profilePhoto, name: message.name})
    return res.status(statusCodes.OK).json({
      message: 'Logado com sucesso',
      token,
      error: false,
      email: user.email,
      id: message.id,
      name: message.name,
      profilePhoto: message.profilePhoto,
      birthday: message.birthday,
      phoneNumber: message.phoneNumber,
    });
  }

  public loginByGoogle = async (req: Request, res: Response) => {
    const user: UserGoogleCredentials = req.body;
    const { error, message, type, oldAss } = await this.authService.authByGoogle(user)
    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});
    
      const token = createToken({email: user.email, id: message.id, profilePhoto: message.profilePhoto, name: message.name})
    if(type === 'Register') {
      return res.status(statusCodes.OK).json({
        message: 'Registrado com sucesso!',
        token,
        error: false,
        email: user.email,
        id: message.id,
        name: message.name,
        profilePhoto: message.profilePhoto,
        birthday: message.birthday,
        phoneNumber: message.phoneNumber,
        premium: false,
    });
    }
    return res.status(statusCodes.OK).json({
      message: 'Logado com sucesso',
      token,
      error: false,
      email: user.email,
      id: message.id,
      name: message.name,
      profilePhoto: message.profilePhoto,
      birthday: message.birthday,
      phoneNumber: message.phoneNumber,
      premium: message.premium,
      oldAss
    });
  }

  public getUserData = async (req: Request, res: Response) => {
      try {
        const token = req.header('Authorization') as string;
        const user: any = await jwt.verify(token, this.key);
    
        const { error: userErr, message: userMess } = await this.userService
          .findUserById(user.id);
    
        const oldAss = await SignatureModel.findOne({
          where: { userId: userMess.id }
        })
        const {
          id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId
        } = userMess
        const data = {
          id, name, email, profilePhoto, birthday, phoneNumber, premium, stripeClientId, oldAss
        }
        if(userErr) return res.status(statusCodes.BAD_REQUEST)
          .json({ message: userErr.message, error: userErr.message });
        return res.status(statusCodes.OK).json({ message: data });
      } catch(e) {
        return res.status(401).json({ message: 'errror' });
      }
  }

  public getAdm = async (req: Request, res: Response) => {
    const { email } = req.body
    
    const { error: userErr, message: userMess } = await this.userService
      .findAdm(email);

      if(userErr) return res.status(statusCodes.BAD_REQUEST)
      .json({ message: null, error: userErr.message });

    return res.status(statusCodes.OK).json({ message: userMess, error: null });
  }  
}

export default UserController;
