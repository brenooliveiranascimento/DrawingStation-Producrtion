import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { NotificationTypes } from '../../Types/AuthTypes';
import { genericNotificationAction } from './genericNotificaitonActions';

export const updateNotification = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { userData } = state().user;
    if(!userData.name.length) return;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      await apiConnection.put('/notification/update',
        { userId: userData.id },
        { headers: { 'Authorization': token } });
      dispatch(genericNotificationAction(
        NotificationTypes.UPDATE_NOTIFICATION,
        null));
    } catch(e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };
};