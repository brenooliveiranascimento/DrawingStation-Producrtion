import { InitialValueState } from '../UserInterfaces';
import { IClassroomController } from './classroomControllerInterfaces';
import { ClassroomStateInterface } from './classroomInterface';
import { ModuleStateInterface, SubModuleStateInterface } from './ModulesInterface';

export interface globalState {
  user: InitialValueState,
  modules: ModuleStateInterface
  subModules: SubModuleStateInterface;
  classroomsData: ClassroomStateInterface;
  classroomController: IClassroomController
}