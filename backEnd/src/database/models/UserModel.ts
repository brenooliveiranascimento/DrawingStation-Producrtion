import { DATE, BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import SubComment from './SubCommentModel';

class Users extends Model {
  declare id: number;
  declare name: string;
  declare email: number;
  declare password: string;
  declare active: boolean;
  declare recoverPasswordCode: number;
  declare birthday: Date;
  declare recoverPasswordToken: string;
  declare premium: boolean;
  declare stripeClientId: string;
  declare profilePhoto: string | null;
  declare phoneNumber: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  recoverPasswordCode: {
    defaultValue: null,
    type: INTEGER,
    allowNull: true,
  },
  name: {
    type: STRING(30),
    allowNull: false,
  },
  recoverPasswordToken: {
    defaultValue: null,
    allowNull: true,
    type: STRING(300),
  },
  email: {
    type: STRING(60),
    allowNull: false,
  },
  password: {
    type: STRING(300),
    allowNull: false,
  },
  loginType: {
    type: STRING(100),
    allowNull: false,
  },
  profilePhoto: {
    type: STRING(300),
    allowNull: true,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  stripeClientId:  {
    type: STRING(300),
    allowNull: true,
  },
  premium: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  birthday: {
    type: STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: STRING,
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

Users.hasMany(SubComment);
SubComment.belongsTo(Users);

export default Users;