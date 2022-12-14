import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, IComments } from "../../interfaces/commentsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import CheckComment from "./CheckComment";

export default class UpdateComment {
  constructor(
    private commentModel = CommentModel,
    private checkComment = CheckComment
    ) {}

  async execute(comment: IComments): Promise<ICommentGenericReturn> {
    const { id } = comment;
    try {
      await this.checkComment
      await this.commentModel.update({ ...comment }, {where: { id }})
      return { message: 'Comentário atualizado com sucesso!' };
    } catch(e: any) {
      throw new CustomError('Server Error, não foi possível atualizar o comentário', 404);
    }
  }
}
