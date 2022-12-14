import CommentModel from "../../database/models/CommentModel";
import { ICommentGenericReturn, IComments } from "../../interfaces/commentsTypes";

export default class UpdateComment {
  constructor(private commentModel = CommentModel) {}

  async execute(comment: IComments): Promise<ICommentGenericReturn> {
    const { id } = comment;
    try {
      await this.commentModel.update({ ...comment }, {where: { id }})
      return { message: 'Comentário atualizado com sucesso!' };
    } catch(e: any) {
      throw new Error()
    }
  }
}