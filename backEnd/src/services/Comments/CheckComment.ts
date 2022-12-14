import Classroom from "../../database/models/ClassroomModel";
import Users from "../../database/models/UserModel";
import { IComments } from "../../interfaces/commentsTypes";
import { errorMapTypes } from "../../utils/errorMap";
import CustomError from "../../utils/StatusError";

export default class CheckComment {
  constructor(
    private classroomModel = Classroom,
    private usersModel = Users,
  ) {}

  async commentCheckList(comment: IComments): Promise<void> {
    const { content, userId, classroomId } = comment;
    const user = await this.usersModel.findByPk(userId);
    const classroom = await this.classroomModel.findByPk(classroomId);
    if(!content) throw new CustomError(errorMapTypes.COMMENT_NO_CONTENT, 401);
    if(!userId || !user) throw new CustomError(errorMapTypes.USER_COMMENT_NOT_FOUND, 401);
    if(!classroomId || !classroom) throw new CustomError(errorMapTypes.CLASSROOM_COMMENT_NOT_FOUND, 401);
  }
};