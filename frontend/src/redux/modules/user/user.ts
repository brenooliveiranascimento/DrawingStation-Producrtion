import { InitialValueState } from '../../../interfaces/UserInterfaces';
import { AuthTypes } from '../../Types/AuthTypes';

const INITIAL_VALUE: InitialValueState = {
  userData: {
    name: '',
    uid: null,
    email: '',
    profilePhoto: '',
  },
  logged: false,
  error: false,
  loginInit: false
};

const ACTION_VALUE = {
  type: '',
  payload: ''
};

function user(state = INITIAL_VALUE, action = ACTION_VALUE) {
  switch(action.type) {
  case AuthTypes.INIT_LOGIN:
    return { ...state, loginInit: true };
  case AuthTypes.LOGIN_FAIL:
    return { ...state, error: true, loginInit: false };
  case AuthTypes.LOGIN_SUCCESS:
    return { ...state, userData: action.payload, loginInit: false, logged: true };
  case AuthTypes.SIGOUT:
    return { ...state, userData: INITIAL_VALUE, logged: false };
  default:
    return state;
  }
}

export default user;
