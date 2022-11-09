import { Request, Response } from 'express';
import ModuleService from '../services/Modules.service';
import statusCodes from '../statusCode';
import jwt from 'jsonwebtoken'
class ModuleController {
  constructor(private bookService = new ModuleService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const modules = await this.bookService.getAll();
    res.status(statusCodes.OK).json({ message: modules, status: 'Sucesso!' })
  }

  public getAllFree = async (req: Request, res: Response) => {
    const key = process.env.SECRET as string
    const token = req.header('Authorization') as string;
    const user = jwt.verify(token, key);
    console.log(user)
    const { error, message } = await this.bookService.findFreeClassroom();
    if(error) return res.status(statusCodes.BAD_REQUEST)
      .json({ message });

    return res.status(statusCodes.OK).json({ message });
  }
}

export default ModuleController;
