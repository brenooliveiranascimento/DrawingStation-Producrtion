import { Request, Response } from 'express';
import ModuleService from '../services/Modules.service';
import statusCodes from '../statusCode';

class ModuleController {
  constructor(private bookService = new ModuleService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const modules = await this.bookService.getAll();
    res.status(statusCodes.OK).json({ message: modules, status: 'Sucesso!' })
  }

  public getAllFree = async (_req: Request, res: Response) => {
    const { error, message } = await this.bookService.findFreeClassroom();
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message });

    return res.status(statusCodes.OK).json({ message });
  }
}

export default ModuleController;
