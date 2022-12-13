import { IComments } from "../interfaces/commentsTypes";
import CommentModel from "../database/models/CommentModel";
import SubComment from "../database/models/SubCommentModel";

export default class CommentsServices {
  constructor(private commentModel = CommentModel) {}

  async getAll() {
    const comments = await this.commentModel.findAll(
      { include: [{ model: SubComment, as: 'subcomments' }] }
    );
    console.log(comments)
    return comments
  }
}