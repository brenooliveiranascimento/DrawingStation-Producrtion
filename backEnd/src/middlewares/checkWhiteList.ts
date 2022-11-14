import { NextFunction, Request, Response } from 'express';

const checkAdm = (req: Request, res: Response, next: NextFunction) => {
  const { admEmail } = req.body
  console.log(admEmail)
  const key = process.env.FIRST_ADM_EMAIL as string

  if (admEmail !== key) {
    return res.status(401).json({ message: 'Adm No Validation' });
  }

  next();
};

export default checkAdm;
