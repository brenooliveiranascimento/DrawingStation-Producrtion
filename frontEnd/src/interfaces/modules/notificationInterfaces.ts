export interface ISenderData {
  name: string;
  email: string;
  profilePhoto: string;
}

export interface IClassData {
  image: string,
  name: string,
  id: number,
  subModuleId: number
}

export interface INotification {
  content: string;
  senderData: ISenderData;
  classData: IClassData;
  type: string;
  active: boolean;
  id: number;
  commentId:number;
  subCommentId: number
}

export interface INotificationState {
  data: INotification[],
  error: boolean;
  errorMessage: string;
  createAt: Date;
}