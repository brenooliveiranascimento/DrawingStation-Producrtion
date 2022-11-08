import { Response, Request } from 'express';
import { UserCredentials, UserInterface } from '../interfaces/userTypes';
import AuthService from '../services/autentication.services';
import statusCodes from '../statusCode';
import createToken from '../utils/jwt.utils';

class UserController {
  constructor(private authService = new AuthService()) {}

  public create = async (req: Request, res: Response) => {
    const user: UserCredentials = req.body;
    const { error } = await this.authService.register(user);

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});

    const token = createToken({email: user.email})
    return res.status(statusCodes.NOT_FOUND)
      .json({message: 'Usuário cirado com sucesso', token, error: false});
  }

  public login = async (req: Request, res: Response) => {
    const user: UserCredentials = req.body;
    const { error } = await this.authService.login(user)

    if(error) return res.status(statusCodes.NOT_FOUND)
      .json({message: error.message, token: null, error: true});

    const token = createToken({email: user.email})
    return res.status(statusCodes.OK).json({message: 'Logado com sucesso', token, error: false});
  }
}

export default UserController;
