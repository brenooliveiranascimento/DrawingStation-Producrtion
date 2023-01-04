import { ControllInterfaceTyes } from '../../Types/AuthTypes';

export const controllInterfaceInitialValue = {
  toComments: false,
};

export const controllInterfaceAction = {
  type: '',
  payload: false
};

export default function controllInterface(
  state = controllInterfaceInitialValue, action = controllInterfaceAction
) {
  switch(action.type) {
  case ControllInterfaceTyes.GO_TO_COMMENTS:
    return { ...state, toComments: true };
  default:
    return state;
  }
}