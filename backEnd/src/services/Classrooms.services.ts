import ClassroomModel from '../database/models/ClassroomModel';
import ClassRoomDataModel from '../database/models/ClassRoomDataModel';
import { ClassroomDataInterface, ClassroomInterface } from '../interfaces/classroomsTypes';
import { errorMapTypes } from '../utils/errorMap';
import ModuleService from './Modules.service';
import {Transaction} from "sequelize";
import sequelize from 'sequelize';

class ClassroomService extends ModuleService {
  public async addNewClassroomData(classroomData: ClassroomDataInterface) {
    const add = await ClassRoomDataModel.create({...classroomData});
    if(!add) return { error: { message: errorMapTypes.ERROR_ADD_NEW_CLASSROOM_DATA }, message: null }
  }

  public async addNewClassroom(newClassroom: ClassroomInterface, classroomData: ClassroomDataInterface) {

    const add = await ClassroomModel.create({...newClassroom});

    if(!add) return { error: { message: errorMapTypes.ERROR_ADD_NEW_CLASSROOM }, message: null }

    const addClassroomData = await this.addNewClassroomData({
      ...classroomData,
      classroomId: add.id
    })}

}

export default ClassroomModel
