import subModule from './SubModuleModel';
import { DATE, BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Classroom extends Model {
  declare id: number;
  declare name: string;
  declare image: string;
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
  referenceImage: {
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
  },
}, {
  sequelize: db,
  modelName: 'classrooms',
  timestamps: false,
});

subModule.hasMany(Classroom);
subModule.belongsTo(subModule);

export default Classroom;