import NotificationsModel from "../../database/models/NotificationModel";
import CustomError from "../../utils/StatusError";
import Get from "./Get";

export default class Update extends Get{
  constructor() {
    super();
  }

  async executeUpdate(id: number) {
    try {
      const notifications = await this.execute(id);
      await Promise.all(notifications
          .map(async(currNotification) => {
        await NotificationsModel.update(
          { active: false },
          { where: { id: currNotification.id } })
      }));
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}