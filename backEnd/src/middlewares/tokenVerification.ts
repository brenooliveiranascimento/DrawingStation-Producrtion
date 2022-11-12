import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorMapTypes } from '../utils/errorMap';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  const key = process.env.SECRET as string

  if (!token) {
    return res.status(401).json({ message: 'Token not found', error: { message: errorMapTypes.TOKEN_NOT_FOUND } });
  }
  try {
    jwt.verify(token, key);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token', error: { message: errorMapTypes.TOKEN_NOT_FOUND } });
  }
};

export default validateToken;
