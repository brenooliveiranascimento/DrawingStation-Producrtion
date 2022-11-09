import { NextFunction, Request, Response } from "express";
import { ClassroomDataInterface, ClassroomInterface } from "../../interfaces/classroomsTypes";
import { ModuleInterface } from "../../interfaces/modulesTypes";
import statusCodes from "../../statusCode";


function validateProperties(
  newClassroom: ClassroomInterface | ClassroomDataInterface,
  classroomProperties:string[]): [boolean, string | null] {
  for (let i = 0; i < classroomProperties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(newClassroom, classroomProperties[i])) {
      return [false, classroomProperties[i]];
    }
  }
  return [true, null];
}

function validateValues(newClassroom: ClassroomInterface | ClassroomDataInterface): [boolean, string | null] {
  const entries = Object.entries(newClassroom);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if(property === 'premium' || property === 'isPremium') return [true, null];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

export function validationClassroom(req: Request, res: Response, next: NextFunction) {
  const { classroom } = req.body;
  const classroomProperties = ['name', 'image', 'premium', 'subModuleId'];

  let [valid, property] = validateProperties(classroom, classroomProperties);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} é obrigatório.`,
      error: true
    }
    );
  }

  [valid, property] = validateValues(classroom);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} de Classroom não pode ser vazio.`,
      error: true
    }
    );
  }

  next();
}

export function validationClassroomData(req: Request, res: Response, next: NextFunction) {
  const { classroomData } = req.body;
  const classroomDataProperties = ['drawing', 'description', 'image', 'isPremium'];

  let [valid, property] = validateProperties(classroomData, classroomDataProperties);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} de Classroom Data é obrigatório.`,
      error: true
    }
    );
  }

  [valid, property] = validateValues(classroomData);

  if (!valid) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: `O campo ${property} não pode ser vazio.`,
      error: true
    }
    );
  }

  next();
}
