import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { ICommentsWithUserData, IDeleteComment, IEditComment, IsubComments } from '../../../interfaces/modules/commentsModuleInterfaces';
import { apiConnection } from '../../../services/api.connection';
import { CommentsTypes } from '../../Types/AuthTypes';
import { genericCommentAciton, requestComments } from './genericAtions';

export const deleteCommentAction = (commentData: IDeleteComment, comentData: ICommentsWithUserData): any => {
  return async (dispatch: Dispatch<any>) => {
    const { userId, id } = commentData;
    const cookies = parseCookies();

    const token = cookies['DRAWING_USER_DATA'];

    try {
      const { data } = await apiConnection.put(`/comments/delete/${id}`,
        { userId, },
        { headers: { 'Authorization': token } });
      toast.success(data);

      dispatch(genericCommentAciton(CommentsTypes.DELETE_COMMENT, comentData));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};

export const deleteSubCommentAction = (commentData: IDeleteComment, subComment: IsubComments): any => {
  return async (dispatch: Dispatch<any>) => {
    const { userId, id } = commentData;
    const cookies = parseCookies();

    const token = cookies['DRAWING_USER_DATA'];

    try {
      const { data } = await apiConnection.put(`/subComments/delete/${id}`,
        { userId, },
        { headers: { 'Authorization': token } });
      toast.success(data.message);
      const { data: newComments } = await apiConnection.get('/comments/all', { headers: { 'Authorization': token } });
      dispatch(requestComments(newComments.reverse()));
    } catch(e: any) {
      toast.error(e.response.data.message);
    }
  };
};
