export interface ModulesInterface {
  id?: number;
  name?:string;
  description?: string;
  image?: string;
  premium?: boolean
}

export interface ModuleStateInterface {
  modules: ModulesInterface;
  load: boolean;
  error: boolean;
}

export interface ModuleActionInterface {
  type: string;
  payload: ModuleActionInterface;
}
