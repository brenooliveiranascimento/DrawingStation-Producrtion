import { ClassroomInterface } from './classroomInterface';

export interface ModulesInterface {
  id?: number | any;
  name:string | any;
  description?: string | any;
  image: string | any;
  premium?: boolean | any
}

export interface SubModuleInterface {
  id?: number;
  name:string;
  description: string;
  image: string;
  premium: boolean;
  moduleId?: number;
  classrooms?: ClassroomInterface[] | any,
  identity?: string;
  admPassword?: string
}

export interface EditModule {
  admPassword?: string,
  id?: number;
  name?:string;
  description?: string;
  image?: string;
  premium?: boolean;
  moduleId?: number
}

export interface ModuleStateInterface {
  modules: ModulesInterface[] | any;
  load: boolean;
  error: boolean;
  currModule: number | null
}

export interface SubModuleStateInterface {
  subModules: SubModuleInterface[] | any;
  load: boolean;
  error: boolean;
  currSubModule: number | null
}

export interface ModuleActionInterface {
  type: string;
  payload?: ModulesInterface[] | ModulesInterface | any
}

export interface SubModuleActionInterface {
  type: string;
  payload?: SubModuleInterface[] | SubModuleInterface | any
}

