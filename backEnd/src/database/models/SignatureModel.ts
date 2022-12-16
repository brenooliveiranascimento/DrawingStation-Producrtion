import { BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class SignatureModel extends Model {
  declare id: number;
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

export default SignatureModel;