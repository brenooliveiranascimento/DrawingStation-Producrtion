import { ControllInterfaceTyes } from '../../Types/AuthTypes';

export const controllInterfaceInitialValue = {
  toComments: false,
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
    return { ...state, toComments: !state.toComments };
  default:
    return state;
  }
}