import { ControllInterfaceTyes } from '../../Types/AuthTypes';

export const controllInterfaceInitialValue = {
  toComments: false,
  commentId: 0
};

export const controllInterfaceAction = {
  type: '',
  payload: false
};

export default function controlleInterface(
  state = controllInterfaceInitialValue, action = controllInterfaceAction
) {
  switch(action.type) {
  case ControllInterfaceTyes.GO_TO_COMMENTS:
    return { ...state, toComments: true, commentId: action.payload };
  case ControllInterfaceTyes.GO_TO_COMMENTS_FALSE:
    return { ...state, toComments: false, commentId: action.payload };
  default:
    return state;
  }
}