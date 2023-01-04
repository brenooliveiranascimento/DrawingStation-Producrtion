import { Request, Response } from "express";
import CustomError from "../../utils/StatusError";
import Create from "./Create";
import Delete from "./Delete";
import Get from "./Get";
import { ICreateNotificationData } from "./types";
import Update from "./Update";

export default class NotificationController {

  async get(req: Request, res: Response) {
    const { id } = req.params
    try {
      const get = new Get()
      const notifications = await get.execute(Number(id));
      return res.status(200).json({ notifications });
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

  async create(req: Request, res: Response) {
    const notificationData: ICreateNotificationData = req.body
    const create = new Create();
    try {
      await create.execute(notificationData);
      res.status(201).json();
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const update = new Update();
    try {
      await update.execute(Number(id));
      return res.status(203).json();
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

  async deleteOne(req: Request, res: Response) {
    const { userId, id } = req.body;
    const deleteOne = new Delete();

    try {
      await deleteOne.executeOne(userId, id);
      res.status(205).json();
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

  async deleteAll(req: Request, res: Response) {
    const { userId } = req.body;
    const deleteOne = new Delete();

    try {
      await deleteOne.executeAll(userId);
      res.status(205).json();
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }

}