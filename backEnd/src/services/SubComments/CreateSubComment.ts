import { ICommentGenericReturn, IsubComments } from "../../interfaces/commentsTypes";
import SubCommentModel from "../../database/models/SubCommentModel";
import CustomError from "../../utils/StatusError";
import ValidateSubComment from "./ValidateSubComment";

export default class CreateSubComment {
  constructor(
    private subCommentModel = SubCommentModel,
    private validateSubComment = new ValidateSubComment(),
  ) {}
  async execute(subComment: IsubComments): Promise<ICommentGenericReturn> {
    const { commentId, content, userId } = subComment;
    try {
      await this.validateSubComment.checkNewSubComment(subComment);
      await this.subCommentModel.create({ commentId, content, userId, creationDate: new Date(), active: true });
      return { message: 'Comentário adicionado com sucesso!!' }
    } catch(e: any) {
      throw new CustomError(e.message, 500);
    }
  }
}