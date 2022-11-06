import SubModule from './SubModuleModel';
import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';

class Classroom extends Model {
  declare id: number;
  declare name: string;
  declare image: string;
  declare premium: boolean
  declare subModuleId:number;
}

Classroom.init({
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
  image: {
    type: STRING(300),
    allowNull: false,
  },
  subModuleId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  premium: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'classrooms',
  timestamps: false,
});

SubModule.hasMany(Classroom);
Classroom.belongsTo(SubModule);

export default Classroom;
