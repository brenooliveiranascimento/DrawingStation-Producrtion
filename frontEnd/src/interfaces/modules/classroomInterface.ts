export interface ClassroomInterface {
  id: number;
  name: string;
  image: string;
  conclude: boolean,
  subModuleId: number;
  premium: boolean
}

export interface IColorsOne {
  cor: string
}

export interface ClassroomDataInterface {
  id: number;
  video: string;
  drawing: string;
  image: string;
  description: string;
  isPremium: boolean;
  conclude: boolean,
  colors: IColorsOne[] | IColorsOne | any;
  multiExemple: boolean
  classroomId?: number; 
}

export interface ReqClassroomInterface {
  classroom: ClassroomInterface | any;
  classroomData: ClassroomDataInterface | any;
}

export interface ICurrClassroomData {
  name: string;
}

export interface ClassroomStateInterface {
  error: boolean;
  load: boolean;
  classroomsData: ClassroomDataInterface[],
  currClassroom: number,
}

export interface ActionStateInterface {
  type: string;
  payload: ClassroomDataInterface[] | ClassroomDataInterface | any
}
