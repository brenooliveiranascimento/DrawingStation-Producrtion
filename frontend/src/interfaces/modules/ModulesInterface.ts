export interface ModulesInterface {
  id?: number;
  name?:string;
  description?: string;
  image?: string;
  premium?: boolean
}

export interface ClassroomInterface {
  id: number;
  name: string;
  image: string;
  subModuleId: number;
  premium: boolean
}

export interface SubModuleInterface {
  id?: number;
  name:string;
  description: string;
  image: string;
  premium: boolean;
  moduleId: number;
  classrooms?: ClassroomInterface[],
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

