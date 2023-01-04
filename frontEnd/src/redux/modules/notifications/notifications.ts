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

}