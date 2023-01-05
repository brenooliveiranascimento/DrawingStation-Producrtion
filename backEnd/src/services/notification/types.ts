export interface ICreateNotificationData {
  userId: number;
  type: string;
  content: string;
  commentId: number;
  active: boolean;
  senderId: number;
  classroomId: number;
  subCommentId: number
}