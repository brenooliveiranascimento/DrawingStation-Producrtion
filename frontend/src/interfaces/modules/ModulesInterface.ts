export interface ModulesInterface {
  id?: number;
  name?:string;
  description?: string;
  image?: string;
  premium?: boolean
}

export interface ModuleStateInterface {
  modules: ModulesInterface[] | null;
  load: boolean;
  error: boolean;
}

export interface ModuleActionInterface {
  type: string;
  payload: ModulesInterface;
}
