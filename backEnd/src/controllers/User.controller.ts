import { Response, Request } from 'express';
import { UserInterface } from '../interfaces/userTypes';
import AuthService from '../services/autentication.services';

class UserController {
  constructor(private authService = new AuthService()) {}

  public create = async (req: Request, res: Response) => {
    const user: UserInterface = req.body;

  }
}

export default UserController;
