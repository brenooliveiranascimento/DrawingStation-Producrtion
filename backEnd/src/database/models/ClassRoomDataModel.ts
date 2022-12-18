import ClassroomModel from './ClassroomModel';
import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';

class ClassroomData extends Model {
  declare id: number;
  declare video: string;
  declare drawing: string;
  declare colors: string;
  declare multiExemple: boolean;
  declare isPremium: boolean
  declare conclude: boolean
  declare description: string;
  declare classroomId:number;
}

ClassroomData.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: STRING(60),
    allowNull: false,
  },
  image: {
    type: STRING(500),
    allowNull: false,
  },
  conclude: {
    allowNull: false,
    type: BOOLEAN,
  },
  colors: {
    allowNull: false,
    type: STRING(3000),
  },
  multiExemple: {
    allowNull: false,
    type: BOOLEAN,
  },
  video: {
    type: STRING(300),
    allowNull: false,
  },
  drawing: {
    type: STRING(500),
    allowNull: false,
  },
  classroomId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  isPremium: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'classrooms_datas',
  timestamps: false,
});

ClassroomModel.hasOne(ClassroomData);
ClassroomData.belongsTo(ClassroomModel);

export default ClassroomData;
