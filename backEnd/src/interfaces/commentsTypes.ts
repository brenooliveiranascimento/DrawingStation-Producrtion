export interface IsubComments {
  id?: number;
  content: string;
  userId: string;
  commentId: boolean;
  creationDate: Date;
  active: boolean
}

export interface IsubCommentsEdit {
  id?: number;
  userId: string;
  commentId: boolean;
}

export interface ICommentUpdate {
  id: number;
  content?: string;
  userId: number
}

export interface IComments {
  id: number;
  content: string;
  active: boolean;
  userId: string;
  classroomId: number
  creationDate: Date;
}

export interface ICommentGenericReturn {
  message: string
}

export interface IallComments extends IComments {
  subComments: IsubComments[]
}
