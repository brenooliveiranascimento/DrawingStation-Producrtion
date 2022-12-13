export interface ClassroomInterface {
  id?: number;
  name: string;
  image: string;
  subModuleId?: number;
  premium: boolean
}

export interface ClassroomDataInterface {
  id?: number;
  video: string;
  drawing: string;
  image: string;
  description: string;
  isPremium: boolean;
  classroomId?: number;
}

export interface ReqClassroomInterface {
  classroom: ClassroomInterface | any;
  classroomData: ClassroomDataInterface | any;
}

export interface ClassroomStateInterface {
  error: boolean;
  load: boolean;
  classroomsData: ClassroomDataInterface[],
}

export interface ActionStateInterface {
  type: string;
  payload: ClassroomDataInterface[] | ClassroomDataInterface | any
}
