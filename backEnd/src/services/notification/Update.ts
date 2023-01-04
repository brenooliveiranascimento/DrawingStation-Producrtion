import NotificationsModel from "../../database/models/NotificationModel";
import CustomError from "../../utils/StatusError";

export default class Update {
  async execute(id: number) {
    try {
      await NotificationsModel
      .update({ active: false }, { where: { id } })
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}