import { combineReducers } from 'redux';
import user from './user/user';
import modules from './modules/modules';
import subModules from './subModules/subModules';
import classroomsData from './classroomsData/classroomsData';
import { classroomController } from './classController/classcontroller';
import { commentsModule } from './comments/commentsModules';
import notificationsModule from './notifications/notifications';
import controllInterface from './controllInterface/controllInterface';

const rootReducer = combineReducers({
  user,
  modules,
  subModules,
  classroomsData,
  classroomController,
  commentsModule,
  notificationsModule,
  controllInterface
});

export default rootReducer;
