export interface ClassroomInterface {
  id: number;
  name: string;
  image: string;
  subModuleId: number;
  premium: boolean;
}

export interface ClassroomDataInterface {
  id: number;
  video: string;
  drawing: string;
  image?: string;
  description: string;
  isPremium: boolean;
  classroomId?: number;
}
