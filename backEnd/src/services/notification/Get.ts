import NotificationsModel from "../../database/models/NotificationModel";
import statusCodes from "../../statusCode";
import CustomError from "../../utils/StatusError";

export default class Get {
  async execute(id: number) {
    try {
      const notifications = await NotificationsModel
      .findAll({ where: { id } })
    return notifications;
    } catch (e: any) {
      throw new CustomError(500, e.message)
    }
  }
}