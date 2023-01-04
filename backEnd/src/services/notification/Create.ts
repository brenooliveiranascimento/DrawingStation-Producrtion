import { ICreateNotificationData } from "./types";
import NotificationsModel from "../../database/models/NotificationModel";
import CustomError from "../../utils/StatusError";
import UserModel from "../../database/models/UserModel";
import { errorMapTypes } from "../../utils/errorMap";

export default class Create {

  async validateUser(ids: number[]) {
    try {
      await Promise.all(ids
        .map(async (currId: number) => {
          const user = await UserModel.findByPk(currId)
          if(!user) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 500)
        }));
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

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
      await this.validateUser([userId, senderId])
      await NotificationsModel.create({
        classroomId, commentId, content, type, senderId, userId, active: true,
        createAt: new Date()
      });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}