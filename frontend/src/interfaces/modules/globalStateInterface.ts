import { InitialValueState } from '../UserInterfaces';
import { ModuleStateInterface, SubModuleStateInterface } from './ModulesInterface';

export interface globalState {
  user: InitialValueState,
  modules: ModuleStateInterface
  subModules: SubModuleStateInterface;
}