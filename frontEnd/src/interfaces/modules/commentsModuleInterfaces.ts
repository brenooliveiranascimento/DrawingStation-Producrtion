export interface IsubComments {
  id?: number;
  content: string;
  userId: string;
  userData: userData;
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

export interface INewComment {
  content: string;
  userId: number;
  classroomId: number
}

export interface IEditComment {
  content: string;
  userId: number;
  id: number
}

export interface IDeleteComment {
  id: number;
  userId: number;
}

export interface INewSubComment {
  content: string;
  userId: number;
  commentId: number;
  comentTo: number
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
  classroomId: number;
  id: number;
  subComments: IsubComments[];
}


export interface IallComments extends IComments {
  subComments: IsubComments[]
}

export interface ISoterCommentsTypes {
  error: boolean;
  load: boolean;
  comments: ICommentsWithUserData[];
}
