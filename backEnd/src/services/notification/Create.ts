import { ICreateNotificationData } from "./types";
import NotificationsModel from "../../database/models/NotificationModel";
import CustomError from "../../utils/StatusError";

export default class Create {
  async execute(notificationData: ICreateNotificationData) {
    const {
      classroomId,
      commentId,
      content,
      type,
      senderId,
      userId,
    } = notificationData;
    try {
      await NotificationsModel.create({
        classroomId, commentId, content, type, senderId, userId, active: true
      });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}