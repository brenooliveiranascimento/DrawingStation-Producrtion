import { parseCookies } from 'nookies';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { globalState } from '../../../interfaces/modules/globalStateInterface';
import { apiConnection } from '../../../services/api.connection';
import { NotificationTypes } from '../../Types/AuthTypes';
import { genericNotificationAction } from './genericNotificaitonActions';

export const requestNotification = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { userData } = state().user;
    if(!userData.name.length) return;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.get(`/notification/get/${Number(userData.id)}`, {
        headers: { 'Authorization': token }
      });
      dispatch(genericNotificationAction(
        NotificationTypes.REQUEST_NOTIFICATIONS,
        data.notifications));
    } catch(e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };
};