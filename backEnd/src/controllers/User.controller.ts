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

    if(error) return res.status(statusCodes.NOT_FOUND).json({message: error.message, token: null});

    const token = createToken({email: user.email})
    return res.status(statusCodes.NOT_FOUND).json({message: 'Usuário cirado com sucesso', token});
  }

  public login = async (req: Request, res: Response) => {

  }
}

export default UserController;
