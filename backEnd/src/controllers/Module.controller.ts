import { Request, Response } from 'express';
import ModuleService from '../services/Modules.service';
import statusCodes from '../statusCode';
import jwt from 'jsonwebtoken'
import UserService from '../services/User.services';

class ModuleController{
  constructor(
    private moduleService = new ModuleService(),
    private userService = new UserService()
    ) {}
  private key = process.env.SECRET as string

  public getAllSubModules = async (_req: Request, res: Response) => {
    const modules = await this.moduleService.getAllSubModules();
    res.status(statusCodes.OK).json({ message: modules, status: 'Sucesso!' })
  }

  public getAllModules = async (_req: Request, res: Response) => {
    const { error, message } = await this.moduleService.getAllModules();
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message: 'Request modules error' })
    res.status(statusCodes.OK).json({ message })
  }

  public getClassrooms = async (req: Request, res: Response) => {
    const token = req.header('Authorization') as string;
    const user: any = await jwt.verify(token, this.key);

    const { error: userErr, message: userMess } = await this.userService
      .findUserById(user.id);

    const { error, message } = await this.moduleService.findClassrooms(userMess.premium);
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message });

    return res.status(statusCodes.OK).json({ message });
  }
}

export default ModuleController;
