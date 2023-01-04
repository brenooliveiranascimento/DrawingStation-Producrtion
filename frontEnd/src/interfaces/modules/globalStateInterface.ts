import { InitialValueState } from '../UserInterfaces';
import { IClassroomController } from './classroomControllerInterfaces';
import { ClassroomStateInterface } from './classroomInterface';
import { ISoterCommentsTypes } from './commentsModuleInterfaces';
import { ModuleStateInterface, SubModuleStateInterface } from './ModulesInterface';
import { INotificationState } from './notificationInterfaces';

export interface globalState {
  user: InitialValueState,
  modules: ModuleStateInterface
  subModules: SubModuleStateInterface;
  classroomsData: ClassroomStateInterface;
  classroomController: IClassroomController,
  commentsModule: ISoterCommentsTypes;
  notificationsModule: INotificationState
}