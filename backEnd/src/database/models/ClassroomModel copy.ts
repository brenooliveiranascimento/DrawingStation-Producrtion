import SubModule from './SubModuleModel';
import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';

class Classroom extends Model {
  declare id: number;
  declare name: string;
  declare image: string;
  declare video: string;
  declare drawing: string;
  declare description: string;
  declare sub_module_id: number;
  declare premium: boolean;
}

Classroom.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING(100),
    allowNull: false,
  },
  image: {
    allowNull: false,
    type: STRING(150),
  },
  drawing: {
    allowNull: false,
    type: STRING(150),
  },
  video: {
    allowNull: false,
    type: STRING(200),
  },
  description: {
    type: STRING(300),
    allowNull: false,
  },
  sub_module_id: {
    type: INTEGER,
    allowNull: false,
  },
  premium: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize: db,
  modelName: 'classrooms',
  timestamps: false,
  underscored:false
});

SubModule.hasMany(Classroom);
Classroom.belongsTo(SubModule);

export default Classroom;