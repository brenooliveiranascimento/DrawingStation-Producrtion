import { IsubComments, IsubCommentsEdit } from "../../interfaces/commentsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";
import CommentModel from "../../database/models/CommentModel";
import Users from "../../database/models/UserModel";
import SubCommentModel from "../../database/models/SubCommentModel";

export default class ValidateSubComment {
  async checkNewSubComment(subComment: IsubComments): Promise<boolean> {
    const { commentId, content, userId } = subComment;
    try {
      const comment = await CommentModel.findByPk(Number(commentId));
      if(!content.length) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 401);
      if(!commentId || !comment) throw new CustomError(errorMapTypes.COMMENT_NOT_FOUND, 404);

      const user = await Users.findByPk(Number(userId));
      if(!user || !user) throw new CustomError(errorMapTypes.USER_DONT_EXIST, 404);
      return true
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }

  async checkSubCommentUpdate(subComment: IsubCommentsEdit): Promise<boolean> {
    const { commentId, userId, id, content } = subComment;
    try {
      if(!content) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 500);

      const comment = await CommentModel.findByPk(Number(commentId));
      if(!comment) throw new CustomError(errorMapTypes.COMMENT_NOT_FOUND, 404);
      if(Number(userId) !== Number(comment.userId)) throw new CustomError(errorMapTypes.COMMENT_USER_DONT_MATCH, 404);

      const subComment = await SubCommentModel.findByPk(id);
      if(!id || !subComment) throw new CustomError(errorMapTypes.COMMENT_NOT_FOUND, 404);
      return true
    } catch(e: any) {
      throw new CustomError(e.message, 500)
    }
  }
}