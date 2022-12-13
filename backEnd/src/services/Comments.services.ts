import { IallComments, IComments } from "../interfaces/commentsTypes";
import CommentModel from "../database/models/CommentModel";
import SubComment from "../database/models/SubCommentModel";
import CustomError from "../utils/StatusError";

export default class CommentsServices {
  constructor(private commentModel = CommentModel) {}

  async getAll(): Promise<any> {
    try {
      const comments = await this.commentModel.findAll(
        { include: [{ model: SubComment, as: 'subcomments' }] }
      )
      return comments;
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}