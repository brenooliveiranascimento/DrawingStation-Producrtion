import { ICurrClassroomData } from '../../interfaces/modules/classroomInterface';
import { AuthTypes, ClassroomsTypes, SubModulesTypes } from '../Types/AuthTypes';

export const genericRequestControl = (actionType: string) => ({
  type: actionType,
});

export const genericSuccesRequest = (actionType: string, payload: any) => ({
  type: actionType,
  payload
});

export const setCurrSubmodule = (subModuleId: number) => ({
  type: SubModulesTypes.SELECT_SUBMODULE,
  payload: subModuleId,
});

export const setCurrSubmoduleData = (name: string) => ({
  type: ClassroomsTypes.SELECT_CLASSROOMSDATA,
  payload: name,
});

export const setCurrModule = (moduleId: number) => ({
  type: SubModulesTypes.SELECT_MODULE,
  payload: moduleId,
});

export const setCurrClass = (classroom: number) => ({
  type: ClassroomsTypes.SELECT_CLASSROOMS,
  payload: classroom,
});


export const handleScreen = (screen: string) => ({
  type: AuthTypes.HANDLE_SCREEN,
  payload: screen,
});
