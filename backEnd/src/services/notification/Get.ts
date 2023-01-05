import NotificationsModel from "../../database/models/NotificationModel";
import statusCodes from "../../statusCode";
import CustomError from "../../utils/StatusError";
import ClassroomModel from "../../database/models/ClassroomModel";
import UserModel from "../../database/models/UserModel";

export default class Get {

  async mountNotifications(notifications: NotificationsModel[]) {
    const data = await Promise.all(notifications
      .map(async (currNotificaiton: NotificationsModel) => {
        try {
          const getSenderData = await UserModel
          .findOne({ where: { id: currNotificaiton.senderId }, attributes: {include: ['name', 'profilePhoto']}})
        const classOrigin = await ClassroomModel.findOne({
          where: { id: currNotificaiton.classroomId }
        });
        const senderData = {
          name: getSenderData?.name,
          email: getSenderData?.email,
          profilePhoto: getSenderData?.profilePhoto
        }

        const classData = {
          image: classOrigin?.image,
          name: classOrigin?.name,
          id: classOrigin?.id,
          subModuleId: classOrigin?.subModuleId,
        }

        const data = {
          content: currNotificaiton.content,
          type: currNotificaiton.type,
          active: currNotificaiton.active,
          id: currNotificaiton.id,
          createAt: currNotificaiton.createAt,
          commentId: currNotificaiton.commentId
        }
        return { senderData, classData, ...data }
        } catch(e: any) {
          throw new CustomError(e.message, 500);
        }
      }))
      return data
  }

  async execute(id: number) {
    try {
    const notifications = await NotificationsModel
      .findAll({ where: { userId: id } })

    const notificationsData = await this.mountNotifications(notifications);
    return notificationsData.reverse();
    } catch (e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}