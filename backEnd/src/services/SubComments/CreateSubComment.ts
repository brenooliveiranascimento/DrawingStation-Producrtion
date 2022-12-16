import { ICommentGenericReturn, IsubComments } from "../../interfaces/commentsTypes";
import SubCommentModel from "../../database/models/SubCommentModel";
import CustomError from "../../utils/StatusError";
import ValidateSubComment from "./ValidateSubComment";
import { errorMapTypes } from "../../utils/errorMap";
import statusCodes from "../../statusCode";

export default class CreateSubComment {
  constructor(
    private subCommentModel = SubCommentModel,
    private validateSubComment = new ValidateSubComment(),
  ) {}
  async execute(subComment: IsubComments): Promise<string> {
    try {
      const { commentId, content, userId } = subComment;
      await this.validateSubComment.checkNewSubComment(subComment);
      await this.subCommentModel.create({ commentId, content, userId, creationDate: new Date(), active: true });
      return 'Comentário adicionado com sucesso!!'
    } catch(e: any) {
      throw new CustomError('Erro ao cirar subcomentario', statusCodes.BAD_REQUEST);
    }
  }
}