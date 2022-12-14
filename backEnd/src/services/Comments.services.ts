import CommentModel from "../database/models/CommentModel";
import SubCommentModel from "../database/models/SubCommentModel";
import CustomError from "../utils/StatusError";

export default class CommentsServices {
  constructor(private commentModel = CommentModel) {}

  async getAll(): Promise<any> {
    try {
      const comments = await this.commentModel.findAll(
      { include: [{ model: SubCommentModel, as: 'subComments' }] },
      )
      return comments;
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}