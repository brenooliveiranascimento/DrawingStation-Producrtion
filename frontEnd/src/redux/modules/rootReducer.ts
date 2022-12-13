import { combineReducers } from 'redux';
import user from './user/user';
import modules from './modules/modules';
import subModules from './subModules/subModules';
import classroomsData from './classroomsData/classroomsData';

const rootReducer = combineReducers({
  user,
  modules,
  subModules,
  classroomsData
});

export default rootReducer;