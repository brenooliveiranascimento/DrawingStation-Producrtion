import { UserInitialInterface } from '../UserInterfaces';
import { ModuleStateInterface } from './ModulesInterface';

export interface globalState {
  user: UserInitialInterface,
  modules: ModuleStateInterface
}