import { BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import UsersModel from './UserModel';

class SignatureModel extends Model {
  declare id: string;
  declare status: string;
  declare userId: number;
  declare priceId: string;
}

SignatureModel.init({
  id: {
    type: STRING(300),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: STRING(30),
    allowNull: false,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  priceId: {
    type: STRING(300),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'signature',
  timestamps: false,
});

SignatureModel.belongsTo(UsersModel);
UsersModel.hasOne(SignatureModel);

export default SignatureModel;