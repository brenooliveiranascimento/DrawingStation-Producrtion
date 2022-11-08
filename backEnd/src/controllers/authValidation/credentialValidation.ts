import { NextFunction, Request, Response } from "express";
import { UserCredentials } from "../../interfaces/userTypes";
import statusCodes from "../../statusCode";

const credentialProperties = ['email', 'password' ];

function validationCredentials(req: Request, res: Response, next: NextFunction) {
  const credentidals: any = req.body;
  const checkAllCredentials = credentialProperties
  .every((currCredential) => credentidals[currCredential]);

    if(!checkAllCredentials) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: 'Necessario preencher todas as credenciais',
        error: true
      })
    }
    next();
}

export default validationCredentials;
