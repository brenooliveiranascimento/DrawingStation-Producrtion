import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';
import db from '.';
import CommentModel from './CommentModel';

class SubCommentModel extends Model {
  declare id: number;
  declare content: string;
  declare commentId: boolean
  declare creationDate: Date;
  declare userId: number;
  declare active: boolean
}

SubCommentModel.init({
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
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  commentId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  active: {
    type: BOOLEAN,
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
  modelName: 'subComments',
  timestamps: false,
  underscored: true
});

CommentModel.hasMany(SubCommentModel);
SubCommentModel.belongsTo(CommentModel);

export default SubCommentModel;
