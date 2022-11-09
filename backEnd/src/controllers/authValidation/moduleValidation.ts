import { NextFunction, Request, Response } from "express";
import { ModuleInterface } from "../../interfaces/modulesTypes";
import statusCodes from "../../statusCode";

const properties = ['name', 'description', 'image', 'premium'];

function validateProperties(newModule: ModuleInterface): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(newModule, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(newModule: ModuleInterface): [boolean, string | null] {
  const entries = Object.entries(newModule);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if(property === 'premium') return [true, null];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationModule(req: Request, res: Response, next: NextFunction) {
  const newModule: ModuleInterface = req.body;

  let [valid, property] = validateProperties(newModule);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} é obrigatório.`,
      error: true
    }
    );
  }

  [valid, property] = validateValues(newModule);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} não pode ser vazio.`,
      error: true
    }
    );
  }

  next();
}

export default validationModule
