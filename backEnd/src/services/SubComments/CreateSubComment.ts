import { ICommentGenericReturn, IsubComments } from "../../interfaces/commentsTypes";
import SubCommentModel from "../../database/models/SubCommentModel";
import CustomError from "../../utils/StatusError";
import ValidateSubComment from "./ValidateSubComment";
import { errorMapTypes } from "../../utils/errorMap";
import statusCodes from "../../statusCode";

export default class CreateSubComment {
  constructor(
  ) {}
  async execute(subComment: IsubComments) {
    try {
      const validateSubComment = new ValidateSubComment()
      const { commentId, content, userId } = subComment;
      await validateSubComment.checkNewSubComment(subComment);
      const newSub = await SubCommentModel.create({ commentId, content, userId, creationDate: new Date(), active: true });
      return newSub.id
    } catch(e: any) {
      throw new CustomError('Erro ao cirar subcomentario', statusCodes.BAD_REQUEST);
    }
  }
}