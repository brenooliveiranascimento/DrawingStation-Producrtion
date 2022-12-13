import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';
import db from '.';
import Users from './UserModel';

class SubComment extends Model {
  declare id: number;
  declare content: string;
  declare createBy: string;
  declare commentId: boolean
  declare creationData: Date;
}

SubComment.init({
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
  commentId: {
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

Users.hasMany(SubComment);
SubComment.belongsTo(Users);

export default SubComment;
