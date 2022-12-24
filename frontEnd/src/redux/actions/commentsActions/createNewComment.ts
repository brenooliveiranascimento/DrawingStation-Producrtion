
export const requestSubCommentsAction = (): any => {
  return async (dispatch: Dispatch<any>, state: () => globalState) => {
    const { commentsModule } = state();
    if(commentsModule.comments?.length) return;
    const cookies = parseCookies();
    const token = cookies['DRAWING_USER_DATA'];
    try {
      const { data } = await apiConnection.get('/comments/all', {
        headers: { 'Authorization': token }
      });
      dispatch(requestComments(data));
    } catch(e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };
};