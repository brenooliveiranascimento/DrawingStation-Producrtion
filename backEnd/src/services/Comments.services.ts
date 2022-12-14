import { where } from "sequelize";
import CommentModel from "../database/models/CommentModel";
import SubCommentModel from "../database/models/SubCommentModel";
import { IallComments } from "../interfaces/commentsTypes";
import CustomError from "../utils/StatusError";

export default class CommentsServices {
  constructor(private commentModel = CommentModel) {}

  async getAll(): Promise<IallComments[]> {
    try {
      const comments = await this.commentModel.findAll(
      {
        include: [{ model: SubCommentModel, as: 'subComments' }],
        where: { active: true }
      }
      )
      return comments as IallComments[] | any ;
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}