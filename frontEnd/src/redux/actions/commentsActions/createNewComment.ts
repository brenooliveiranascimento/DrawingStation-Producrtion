import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { INewComment } from '../../../interfaces/modules/commentsModuleInterfaces';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { CommentsTypes } from '../../Types/AuthTypes';
import { genericCommentAciton } from './genericAtions';

export const crateCommentAction = (commentData: INewComment): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { classroomId, content, userId } = commentData;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.post('/comments/create',
        {
          classroomId,
          content,
          userId,
        },
        {
          headers: { 'Authorization': token }
        });
      toast.success(data.message);
      // dispatch(genericCommentAciton(CommentsTypes.ADD_NEW_COMMENT, ))
      console.log(data);
    } catch(e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };
};