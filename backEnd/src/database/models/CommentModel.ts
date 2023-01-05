import { Model, INTEGER, STRING, DATE, BOOLEAN } from 'sequelize';
import db from '.';
import SubCommentModel from './SubCommentModel';

class CommentModel extends Model {
  declare id: number;
  declare content: string;
  declare userId: string;
  declare commentId: boolean;
  declare active: boolean;
  declare creationDate: Date;
  declare classroomId: number;
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
  classroomId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  creationDate: {
    type: DATE,
    allowNull: false,
    primaryKey: true,
  },
}, {
  sequelize: db,
  modelName: 'comments',
  timestamps: false,
  underscored: true
});

export default CommentModel;
