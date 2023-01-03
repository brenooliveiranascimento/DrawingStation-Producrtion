import { IClassController } from '../../interfaces/modules/classroomControllerInterfaces';
import { ClassroomInterface, ICurrClassroomData } from '../../interfaces/modules/classroomInterface';
import { SubModuleInterface } from '../../interfaces/modules/ModulesInterface';
import { AuthTypes, ClassroomControllerTypes, ClassroomsTypes, SubModulesTypes } from '../Types/AuthTypes';

export const genericRequestControl = (actionType: string) => ({
  type: actionType,
});

export const genericSuccesRequest = (actionType: string, payload: any) => ({
  type: actionType,
  payload
});

export const handleScreen = (screen: string) => ({
  type: AuthTypes.HANDLE_SCREEN,
  payload: screen,
});

export const incompleteASubModule = () => ({
  type: ClassroomControllerTypes.INCOMPLETE_SUBMODULE
});

export const setCurrModule = (moduleData: {
  module: {name: string, id: number},
  subModules: SubModuleInterface[],
}) => ({
  type: ClassroomControllerTypes.SELECT_MODULE,
  payload: moduleData,
});

export const setCurrSubmodule = (currSubModuleData: {name: string, id: number}) => ({
  type: ClassroomControllerTypes.SELECT_SUBMODULE,
  payload: currSubModuleData,
});

export const setCurrClass = (classData: IClassController) => ({
  type: ClassroomControllerTypes.SELECT_CLASSROOMS,
  payload: classData,
});

export const buyPremium = (classData: ClassroomInterface) => ({
  type: ClassroomControllerTypes.BUY_PREIUM,
  payload:classData
});
