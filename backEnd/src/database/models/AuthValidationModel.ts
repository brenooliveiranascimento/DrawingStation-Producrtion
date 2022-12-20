import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class AuthValidationModel extends Model {
  declare id: number;
  declare email: string;
  declare token: string;
  declare code: number;
}

AuthValidationModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: STRING(60),
    allowNull: true,
  },
  token: {
    type: STRING(60),
    allowNull: true,
  },
  code: {
    type: INTEGER,
    allowNull: true,
  },
}, {
  sequelize: db,
  modelName: 'authValidation',
  timestamps: false,
  underscored: true
});

export default AuthValidationModel;
