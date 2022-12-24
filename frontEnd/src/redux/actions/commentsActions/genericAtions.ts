import { ICommentsWithUserData } from '../../../interfaces/modules/commentsModuleInterfaces';
import { CommentsTypes } from '../../Types/AuthTypes';

export const requestComments = (comments: ICommentsWithUserData) => ({
  type: CommentsTypes.REQUEST_COMMENTS,
  payload: comments
});