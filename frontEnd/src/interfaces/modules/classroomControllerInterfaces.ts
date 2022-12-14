import { SubModuleInterface } from './ModulesInterface';

export interface IClassController {
  id: number;
  name: string;
  premium: boolean;
  video: string;
  description: string;
  colors: any;
  conclude: boolean;
  image: string;
  multiExemple: boolean
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
  currSubModule: ISubmoduleController;
  subModules: SubModuleInterface[];
  module: IModuleController;
  classroom: IClassController;
  loading: boolean;
  incomplete: boolean;
  buyPremium: boolean
}
