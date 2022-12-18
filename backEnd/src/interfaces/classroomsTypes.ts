export interface ClassroomInterface {
  id: number;
  name: string;
  image: string;
  conclude: boolean;
  subModuleId: number;
  premium: boolean;
}

export interface ClassroomDataInterface {
  id: number;
  video: string;
  drawing: string;
  image?: string;
  colors: string;
  multiExemple: boolean;
  conclude: boolean;
  description: string;
  isPremium: boolean;
  classroomId?: number;
}
