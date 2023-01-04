import { INotification } from '../../../interfaces/modules/notificationInterfaces';

export const genericNotificationAction = (
  type: string, payload: INotification | undefined) => ({
  type,
  payload
});