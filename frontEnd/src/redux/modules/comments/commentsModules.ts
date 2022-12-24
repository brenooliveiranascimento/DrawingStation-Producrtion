import { ICommentsWithUserData, ISoterCommentsTypes } from '../../../interfaces/modules/commentsModuleInterfaces';
import { CommentsTypes } from '../../Types/AuthTypes';

const COMMENTS_DEFAULT_VALUE: ISoterCommentsTypes = {
  load: true,
  comments: [],
  error: false,
};

const ACTION_DEFAULT_VALUE: any = {
  type: '',
  payload: undefined
};

export function commentsModule(state = COMMENTS_DEFAULT_VALUE, action = ACTION_DEFAULT_VALUE) {
  switch(action.type) {
  case CommentsTypes.REQUEST_COMMENTS:
    return { ...state, comments: action.payload, load: false };
  case CommentsTypes.ADD_NEW_COMMENT:
    return { ...state, comments: [ ...state.comments, action.payload ] };
  case CommentsTypes.DELETE_COMMENT:
    return { ...state,
      comments: state.comments.filter((currComment: ICommentsWithUserData) =>
        currComment.id !== action.payload.id)};
  case CommentsTypes.UPDATE_COMMENT:
    return { ...state,
      comments: state.comments.map((currComment: ICommentsWithUserData) =>
        currComment.id === action.payload.id ? action.payload : currComment )};
  case CommentsTypes.REQUEST_COMMENTS_FAIL:
    return { ...state, load: false, error: true };
  default:
    return state;
  }
}