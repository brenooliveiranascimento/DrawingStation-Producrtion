import UserModel from './UserModel';
import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';
import db from '.';

class Subscription extends Model {
  declare id: number;
  declare transactionData: Date;
  declare expirationData: Date;
  declare subscriptionType: string;
  declare value: number;
  declare active: boolean;
  declare userId: number
}

Subscription.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  transactionData: {
    type: DATE(),
    allowNull: false,
  },
  expirationData: {
    type: DATE(),
    allowNull: false,
  },
  subscriptionType: {
    type: STRING(50),
    allowNull: false,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  active: {
    type: BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'subscription',
});

UserModel.hasOne(Subscription);
Subscription.belongsTo(UserModel);

export default Subscription;
