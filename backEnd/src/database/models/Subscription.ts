import UserModel from './UserModel';
import { Model, INTEGER, STRING, BOOLEAN, DATE } from 'sequelize';
import db from '.';

class Subscription extends Model {
  declare id: number;
  declare transactionData: Date;
  declare expirationData: Date;
  declare subscriptionType: string;
  declare value: number;
  declare status: boolean;
  declare userId: number
}

Subscription.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  priceId: {
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
