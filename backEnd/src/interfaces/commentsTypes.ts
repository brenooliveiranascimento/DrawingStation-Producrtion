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
  content: string;
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

export interface userData {
  id: number;
  name: string;
  email: string;
  profilePhoto: string | null;
  active: boolean;
  premium: boolean;
}

export interface IAllSubCommentsUserData extends IComments {
  subComments: IsubComments[];
  userData: userData;
}

export interface INewSubComments {
  userData: userData;
  active: string;
  commentId: number;
  content: string;
  creationDate: Date;
  id: number
}

export interface ICommentsWithUserData {
  userData: userData;
  content: string;
  creationDate: Date;
  subComments: INewSubComments[];
}


export interface IallComments extends IComments {
  subComments: IsubComments[]
}
