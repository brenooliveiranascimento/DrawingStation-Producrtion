import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, ICommentUpdate } from "../../interfaces/commentsTypes";
import CustomError from "../../utils/StatusError";
import CheckComment from "./CheckComment";

export default class InactiveComment {
  constructor(
    private checkComment = new CheckComment()
  ) {}

  async execute(comment: ICommentUpdate): Promise<string> {
    const { id } = comment;
    try {
      await this.checkComment.commentUpdateCheckList({ ...comment, content: 'Delete' });
      await CommentModel.update(
        { active: false },
        { where: { id } },
      )
      return 'Comentário removido com sucesso!'
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}