const INITIAL_STATE = {
  error: false,
  load: false,
  classroomsData: [],
};

const INITIAL_ACITON_VALUE = {
  type: '',
  payload: '',
};

export function classroomsData(state = INITIAL_STATE, action = INITIAL_ACITON_VALUE) {
  switch(action.type) {
  default:
    return state;
  }
}
