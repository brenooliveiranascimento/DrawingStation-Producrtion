import { combineReducers } from 'redux';
import user from '../modules/user/user';
import modules from '../modules/modules/modules';
import subModules from '../modules/subModules/subModules';
import classroomsData from '../modules/classroomsData/classroomsData';

const rootReducer = combineReducers({
  user,
  modules,
  subModules,
  classroomsData
});

export default rootReducer;
