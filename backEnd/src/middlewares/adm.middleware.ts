import { NextFunction, Request, Response } from 'express';

const validateAdm = (req: Request, res: Response, next: NextFunction) => {
  const { identity } = req.body
  const key = process.env.UPDATE_DELETE_CREDENTIAL as string
  if (identity !== key) {
    return res.status(401).json({ message: 'AdmEmail No Validation' });
  }

  next();
};

export default validateAdm;
