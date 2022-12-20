import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class AuthValidationModel extends Model {
  declare id: number;
  declare email: string;
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
    allowNull: false,
  },
  code: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'authValidation',
  timestamps: false,
});

export default AuthValidationModel;
