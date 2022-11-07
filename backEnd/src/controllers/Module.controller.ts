import { Request, Response } from 'express';
import ModuleService from '../services/modules.service';
import statusCodes from '../statusCode';

class ModuleController {
  constructor(private bookService = new ModuleService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const modules = await this.bookService.getAll();
    res.status(statusCodes.OK).json({ message: modules, status: 'Sucesso!' })
  }
}

export default ModuleController;
