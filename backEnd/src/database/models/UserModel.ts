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
    type: STRING(30),
    allowNull: false,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
  },
  premium: {
    type: BOOLEAN,
    allowNull: false,
  },
  birthday: {
    type: DATE,
    allowNull: true,
  },
  phoneNumber: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default Users;