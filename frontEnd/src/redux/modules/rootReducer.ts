import { combineReducers } from 'redux';
import user from './user/user';
import modules from './modules/modules';
import subModules from './subModules/subModules';
import classroomsData from './classroomsData/classroomsData';
import { classroomController } from './classController/classcontroller';

const rootReducer = combineReducers({
  user,
  modules,
  subModules,
  classroomsData,
  classroomController
});

export default rootReducer;
