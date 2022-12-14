export interface IsubComments {
  id: number;
  content: string;
  userId: string;
  commentId: boolean
  creationDate: Date;
}

export interface IComments {
  id: number;
  content: string;
  userId: string;
  classroomId: boolean
  creationDate: Date;
}

export interface IallComments extends IComments {
  subComments: IsubComments[]
}
