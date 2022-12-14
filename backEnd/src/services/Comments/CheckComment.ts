import Classroom from "../../database/models/ClassroomModel";
import Users from "../../database/models/UserModel";
import { IComments, ICommentUpdate } from "../../interfaces/commentsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class CheckComment {

  constructor() {}

  async commentCheckList(comment: IComments): Promise<boolean> {
    const { content, userId, classroomId } = comment;
    const user = await Users.findByPk(userId);
    const classroom = await Classroom.findByPk(classroomId);
    if(!content) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 401);
    if(!userId || !user) throw new CustomError(errorMapTypes.USER_COMMENT_NOT_FOUND, 401);
    if(!classroomId || !classroom) throw new CustomError(errorMapTypes.CLASSROOM_COMMENT_NOT_FOUND, 401);
    return true
  }

  async commentUpdateCheckList(comment: ICommentUpdate): Promise<boolean> {
    const { content, userId } = comment;
    const user = await Users.findByPk(userId);
    if(!content) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 401);
    if(!userId || !user) throw new CustomError(errorMapTypes.COMMENT_USER_DONT_MATCH, 401);
    return true
  }
};