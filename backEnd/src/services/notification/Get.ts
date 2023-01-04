import NotificationsModel from "../../database/models/NotificationModel";
import statusCodes from "../../statusCode";
import CustomError from "../../utils/StatusError";
import ClassroomModel from "../../database/models/ClassroomModel";
import UserModel from "../../database/models/UserModel";

export default class Get {

  async mountNotifications(notifications: NotificationsModel[]) {
    const data = Promise.all(notifications
      .map(async (currNotificaiton: NotificationsModel) => {
        const senderData = await UserModel
          .findOne({ where: { id: currNotificaiton.senderId }})
        const classOrigin = await ClassroomModel.findOne({
          where: { id: currNotificaiton.classroomId }
        });
        return { ...currNotificaiton, senderData, classOrigin }
      }))
  }

  async execute(id: number) {
    try {

    const notifications = await NotificationsModel
      .findAll({ where: { userId: id } })

    const notificationsData = this.mountNotifications(notifications);

    return notifications;
    } catch (e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}