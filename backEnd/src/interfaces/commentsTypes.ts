export interface IsubComments {
  id: number;
  content: string;
  createBy: string;
  commentId: boolean
  creationData: Date;
}

export interface IComments {
  id: number;
  content: string;
  createBy: string;
  classroomId: boolean
  creationData: Date;
}

export interface IallComments extends IComments {
  subcomments: IsubComments[]
}
