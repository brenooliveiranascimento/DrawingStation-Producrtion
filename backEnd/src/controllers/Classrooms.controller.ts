import { Request, Response } from 'express';
import ClassroomService from '../services/Classrooms.services';
import statusCodes from '../statusCode';

class ClassroomsController {
  constructor(
    private classroomService = new ClassroomService(),
    ) {}

  public addNewClassroom = async (req: Request, res: Response) => {
    const { classroom, classroomData } = req.body;

    const { error, message } = await this.classroomService.addNewClassroom(classroom, classroomData);
    if(error) return res.status(statusCodes.NOT_FOUND).json({ message, error: error.message });

    return res.status(statusCodes.OK).json({ message: "Classroom criada com sucesso!" })
  }

  public updateClassroom = async (req: Request, res: Response) => {
    const { id } = req.params
    const { classroom, classroomData } = req.body;

    const { error, message } = await this.classroomService.updateClassroom(classroom, classroomData, Number(id));
    if(error) return res.status(statusCodes.NOT_FOUND).json({ message, error: error.message });

    return res.status(statusCodes.OK).json({ message: "Classroom criada com sucesso!" })
  }
}

export default ClassroomsController;
