import jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/userTypes';
import 'dotenv'

const createToken = (data: any) => {
  const key = process.env.SECRET as string
  const token = jwt.sign(data, key, {
    expiresIn: '3d'
  });
  return token;
};

export default createToken;
