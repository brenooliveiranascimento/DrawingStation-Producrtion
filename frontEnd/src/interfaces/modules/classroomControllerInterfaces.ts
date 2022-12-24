const CLASSROOM_CONTROLLER_DEFAULT_VALUE = {
  subModule: {
    id: undefined,
    name: '',
  },
  module: {
    id: undefined,
    name: '',
  },
  classroom: {
    id: undefined,
    name: '',
    premium: true,
    video: '',
    description: '',
    colors: null,
    image: '',
  }
};

export interface IClassController {
  id: number;
  name: string;
  premium: boolean;
  video: string;
  description: string;
  colors: any;
  image: string;
}

export interface ISubmoduleController {
  id: number;
  name: string
}


export interface IModuleController {
  id: number;
  name: string
}

export interface IClassroomController {
  subModule: ISubmoduleController;
  module: IModuleController;
  classroom: IClassController;
}
