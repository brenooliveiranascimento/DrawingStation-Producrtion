import { combineReducers } from 'redux';
import user from '../modules/user/user';
import modules from '../modules/modules/modules';

const rootReducer = combineReducers({
  user,
  modules
});

export default rootReducer;
