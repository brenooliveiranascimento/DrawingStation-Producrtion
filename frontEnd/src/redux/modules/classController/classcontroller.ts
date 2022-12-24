const CLASSROOM_CONTROLLER_DEFAULT_VALUE = {
  subModule: {
    id: undefined,
    name: '',
  },
  module: {
    id: undefined,
    name: '',
  },
  classroom: {
    id: undefined,
    name: '',
    premium: true,
    video: '',
    description: '',
    colors: null,
    image: '',
  }
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