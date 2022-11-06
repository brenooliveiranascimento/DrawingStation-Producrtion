export interface ModuleInterface {
  id: number;
  name: string;
  description: string;
  image: string;
  premium: boolean;
}

export interface SubModulesInterface {
  id: number;
  name: string;
  image: string;
  description: string;
  moduleId: number;
  premium: boolean;
}
