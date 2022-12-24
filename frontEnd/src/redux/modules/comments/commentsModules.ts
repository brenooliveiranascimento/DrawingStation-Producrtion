const COMMENTS_DEFAULT_VALUE = {
  load: false,
  comments: [],
  error: false,
};

const ACTION_DEFAULT_VALUE = {
  type: '',
  payload: undefined
};

export function commentsModule(state = COMMENTS_DEFAULT_VALUE, action = ACTION_DEFAULT_VALUE) {
  switch(action.type) {
  default:
    return state;
  }
}