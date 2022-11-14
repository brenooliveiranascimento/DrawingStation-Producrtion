export const genericRequestControl = (actionType: string) => ({
  type: actionType,
});

export const genericSuccesRequest = (actionType: string, payload: any) => ({
  type: actionType,
  payload
});
