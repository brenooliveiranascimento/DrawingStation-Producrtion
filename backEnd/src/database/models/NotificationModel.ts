import { DATE, BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import SubComment from './SubCommentModel';
import UserModel from './UserModel'

class Notifications extends Model {
  declare id: number;
  declare userId: number;
  declare type: string;
  declare content: string;
  declare commentId: number;
  declare active: number;
  declare senderId: number;
  declare classroomId: number;
}

Notifications.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    defaultValue: null,
    type: INTEGER,
    allowNull: true,
  },
  type: {
    type: STRING(30),
    allowNull: false,
  },
  content: {
    defaultValue: null,
    allowNull: true,
    type: STRING(500),
  },
  commentId: {
    type: INTEGER,
    allowNull: false,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
  },
  senderId: {
    type: INTEGER,
    allowNull: false,
  },
  classroomId: {
    type: INTEGER,
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: 'notifications',
  timestamps: false,
});

UserModel.hasMany(Notifications);
Notifications.belongsTo(UserModel);

export default Notifications;