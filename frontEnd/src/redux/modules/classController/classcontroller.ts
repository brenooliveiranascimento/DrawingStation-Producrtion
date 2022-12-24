import { IClassroomController } from '../../../interfaces/modules/classroomControllerInterfaces';

const CLASSROOM_CONTROLLER_DEFAULT_VALUE:IClassroomController = {
  subModule: {
    id: 0,
    name: '',
  },
  module: {
    id: 0,
    name: '',
  },
  classroom: {
    id: 0,
    name: '',
    premium: true,
    video: '',
    description: '',
    colors: null,
    image: '',
  },
  loading: true
};

const ACTION_DEFAULT_VALUE = {
  type: '',
  payload: undefined
};

export function classroomController(
  state = CLASSROOM_CONTROLLER_DEFAULT_VALUE, action = ACTION_DEFAULT_VALUE) {
  switch(action.type) {
  default:
    return state;
  }
}