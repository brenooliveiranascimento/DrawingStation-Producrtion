import { NextFunction, Request, Response } from 'express';
import { UserCredentials, UserInterface } from '../../interfaces/userTypes';
import statusCodes from '../../statusCode';
import Joi from 'joi';
const MIN_CHARACTERS = 6;
const regex = /\S+@\S+\.\S+/;

const properties = ['name', 'email', 'password', 'birthday', 'phoneNumber'];

function validateProperties(User: UserInterface): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(User, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(User: UserInterface): [boolean, string | null] {
  const entries = Object.entries(User);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validadeData(User: UserCredentials): [boolean, string | null] {
  if(!regex.test(User.email)) {
    return [false, 'Formato do email invalido!']
  }

  if(User.password.length < MIN_CHARACTERS) {
    return [false, 'Senha deve ser maior ou uigual a 6']
  }

  return [true, null]

}

function validationUser(req: Request, res: Response, next: NextFunction) {
  const User: UserCredentials = req.body;

  let [valid, property] = validateProperties(User);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} é obrigatório.`,
    }
    );
  }

  [valid, property] = validateValues(User);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} não pode ser nulo ou vazio.`,
    }
    );
  }

  let [validData, propertyData] = validadeData(User);

  if (!validData) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `${propertyData}.`,
    }
    );
  }

  next();
}

export default validationUser;
