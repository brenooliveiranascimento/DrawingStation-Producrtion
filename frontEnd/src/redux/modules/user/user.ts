import { InitialValueState, UserInterface } from '../../../interfaces/UserInterfaces';
import { AuthTypes } from '../../Types/AuthTypes';

const INITIAL_VALUE: InitialValueState = {
  usersControllData:  [],
  userData: {
    name: '',
    id: null,
    email: '',
    profilePhoto: '',
    birthday: null,
    phoneNumber: null,
    premium: false,
    stripeClientId: null,
  },
  logged: false,
  error: false,
  loginInit: false
};

const ACTION_VALUE: any = {
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
  case AuthTypes.REQUEST_USERS:
    return { ...state, usersControllData: action.payload, load: false };
  case AuthTypes.REQUEST_USERS_FAIL:
    return { ...state, error: true };
  case AuthTypes.REMOVE_USER_PREMIUM || AuthTypes.TRANSFORM_USER_PREMIUM ||
  AuthTypes.ACTIVE_USER || AuthTypes.DISABLE_USER:
    return {
      ...state,
      usersControllData: state
        .usersControllData?.map((currUserData: UserInterface) => {
          if(currUserData.id === action.payload.id) return action.payload;
          return currUserData;
        }),
      load: false};
  default:
    return state;
  }
}

export default user;
