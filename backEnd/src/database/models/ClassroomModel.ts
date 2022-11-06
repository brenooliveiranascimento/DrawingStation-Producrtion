import SubModule from './SubModuleModel';
import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';

class Classroom extends Model {
  declare id: number;
  declare name: string;
  declare video: string;
  declare drawing: string;
  declare image: string;
  declare premium: boolean
  declare description: string;
  declare sub_module_id:string;
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
  description: {
    type: STRING(60),
    allowNull: false,
  },
  image: {
    type: STRING(300),
    allowNull: false,
  },
  video: {
    type: STRING(300),
    allowNull: false,
  },
  drawing: {
    type: STRING(300),
    allowNull: false,
  },
  sub_module_id: {
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
  underscored: true,
  timestamps: false,
});

SubModule.hasMany(Classroom);
Classroom.belongsTo(SubModule);

export default Classroom;
