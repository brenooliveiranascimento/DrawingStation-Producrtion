import { NotificationTypes } from '../../Types/AuthTypes';

export const notificationDefaultValue = {
  data: [],
  error: false,
  errorMessage: '',
};

export const actionDefaultValue = {
  payload: [],
  type: '',
};

export default function notificationsModel(
  state = notificationDefaultValue, action = actionDefaultValue
) {
  switch(action.type) {
  case NotificationTypes.REQUEST_NOTIFICATIONS:
    return { ...state, data: action.payload, error: false, errorMessage: ''};
  case NotificationTypes.NOTIFICATION_FAIL:
    return { ...state, data: [...state.data], error: false, errorMessage: action.payload};
  }
}