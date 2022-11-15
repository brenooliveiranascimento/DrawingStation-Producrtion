export interface ClassroomInterface {
  id?: number;
  name: string;
  image: string;
  subModuleId: number;
  premium: boolean
}

export interface ClassroomDataInterface {
  video: string;
  drawing: string;
  image: string;
  description: string;
  isPremium: boolean;
}
