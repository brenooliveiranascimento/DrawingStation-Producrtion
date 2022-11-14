import { combineReducers } from 'redux';
import user from '../modules/user/user';
import modules from '../modules/modules/modules';
import subModules from '../modules/subModules/subModules';

const rootReducer = combineReducers({
  user,
  modules,
  subModules
});

export default rootReducer;
