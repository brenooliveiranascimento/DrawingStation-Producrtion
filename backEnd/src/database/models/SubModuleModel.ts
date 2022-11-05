import Module from './ModuleModel';
import { DATE, BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class SubModule extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare moduleId: number;
  declare premium: boolean;
}

SubModule.init({
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
    allowNull: false,
    type: STRING(150),
  },
  description: {
    type: STRING(300),
    allowNull: false,
  },
  moduleId: {
    type: INTEGER,
    allowNull: false,
  },
  premium: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'sub_modules',
  timestamps: false,
});

Module.hasMany(SubModule);
SubModule.belongsTo(Module);

export default SubModule;