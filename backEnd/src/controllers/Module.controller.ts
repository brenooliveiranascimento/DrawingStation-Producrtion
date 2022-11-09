import { Request, Response } from 'express';
import ModuleService from '../services/Modules.service';
import statusCodes from '../statusCode';
import jwt from 'jsonwebtoken'

class ModuleController {
  constructor(private moduleService = new ModuleService()) {}
  private key = process.env.SECRET as string

  public getAll = async (_req: Request, res: Response) => {
    const modules = await this.moduleService.getAll();
    res.status(statusCodes.OK).json({ message: modules, status: 'Sucesso!' })
  }

  public getClassrooms = async (req: Request, res: Response) => {
    const token = req.header('Authorization') as string;
    const user = jwt.verify(token, this.key);

    const { error, message } = await this.moduleService.findClassrooms(false);
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message });

    return res.status(statusCodes.OK).json({ message });
  }
}

export default ModuleController;
