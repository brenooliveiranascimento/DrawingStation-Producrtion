import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';
import db from '.';
import SubComment from './SubCommentModel';

class CommentModel extends Model {
  declare id: number;
  declare content: string;
  declare createBy: string;
  declare classroomId: boolean
  declare creationData: Date;
}

CommentModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: STRING(500),
    allowNull: false,
  },
  createBy: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  classroomId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  drawing: {
    type: STRING(500),
    allowNull: false,
  },
  creationData: {
    type: DATE,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db,
  modelName: 'comment',
  timestamps: false,
});

CommentModel.hasMany(SubComment);
SubComment.belongsTo(CommentModel);

export default CommentModel;
