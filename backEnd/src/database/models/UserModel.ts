import { DATE, BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;
  declare name: string;
  declare email: number;
  declare password: string;
  declare active: number;
  declare birthday: Date;
  declare premium: boolean;
  declare phoneNumber: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(30),
    allowNull: false,
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
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;