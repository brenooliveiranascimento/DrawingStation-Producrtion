import { Request, Response } from 'express';
import ModuleService from '../services/Modules.service';
import statusCodes from '../statusCode';
import jwt from 'jsonwebtoken'
import UserService from '../services/User.services';
import { errorMapTypes } from '../utils/errorMap';
import { ModuleInterface } from '../interfaces/modulesTypes';

class ModuleController{
  constructor(
    private moduleService = new ModuleService(),
    private userService = new UserService()
    ) {}
  private key = process.env.SECRET as string

  public getAllSubModules = async (_req: Request, res: Response) => {
    const { error, message } = await this.moduleService.getAllSubModules();
    if(error) return res.status(statusCodes.OK).json({ message: null, error: errorMapTypes.REQUEST_ERROR })
    return res.status(statusCodes.OK).json({ message, error: null });
  }

  public addNewModule = async (req: Request, res: Response) => {
    const module: ModuleInterface = req.body;
    const { error, message } = await this.moduleService.addNewModule(module);

    if(error) return res.status(statusCodes.NO_CONTENT).json({ message: null, error: error.message });

    return res.status(statusCodes.OK).json({ message: 'Módulo Adicionado com sucesso!', error: null });
  }

  public deleteModule = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {error, message} = await this.moduleService.deleteModule(Number(id));

    if(error) return res.status(statusCodes.NOT_FOUND).json({ message: null, error: error.message });

    return res.status(statusCodes.NOT_FOUND).json({ message, error: null });
  }
  

  public updateModule = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedModule: ModuleInterface = req.body
    const {error, message} = await this.moduleService.updateModule(Number(id), updatedModule);

    if(error) return res.status(statusCodes.NOT_FOUND).json({ message: null, error: error.message });

    return res.status(statusCodes.NOT_FOUND).json({ message, error: null });
  }

  public getAllModules = async (_req: Request, res: Response) => {
    const { error, message } = await this.moduleService.getAllModules();
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message: null, error: error.message })
    res.status(statusCodes.OK).json({ message, error: null })
  }

  public getClassrooms = async (req: Request, res: Response) => {
    const token = req.header('Authorization') as string;
    const user: any = await jwt.verify(token, this.key);

    const { error: userErr, message: userMess } = await this.userService
      .findUserById(user.id);

      if(userErr) return res.status(statusCodes.BAD_REQUEST)
      .json({ message: userErr.message });

    const { error, message } = await this.moduleService.findClassrooms(userMess.premium);
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message: null, error: error.mesage });

    return res.status(statusCodes.OK).json({ message });
  }
}

export default ModuleController;
