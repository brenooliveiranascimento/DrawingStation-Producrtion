import NotificationsModel from "../../database/models/NotificationModel";
import CustomError from "../../utils/StatusError";

export default class Delete {

  private async validateNotification(userId: number, norification: number) {
    try {
      const notification = await NotificationsModel.findOne({
        where: { id: norification }
      })
      if(notification?.userId !== userId) {
        throw new CustomError('Sem permição', 401);
      }
      return true;
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

  async executeOne(userId: number, notificationId: number) {
    try {
      await this.validateNotification(userId, notificationId);
      await NotificationsModel.destroy({
        where: { id: notificationId }
      });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

  async executeAll(userId: number) {
    console.log(userId)
    try {
      await NotificationsModel.destroy({
        where: { userId }
      });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}