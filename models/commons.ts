export interface ISession {
  user: {
    name: string;
    email: string;
    image: string;
  };
  token: string;
}

export interface ITreeview extends ICategory {
  uuid?: string;
  children?: ITreeview[];
  level: number;
  expand: boolean;
  hide: boolean;
  invalidText?: string;
}

export interface ICategory {
  id: string;
  name: string;
  useYn: string;
  pid: string | null;
}

export interface ICategoryShowResponse {
  category: ICategory[];
  message: string;
  success: boolean;
}

export interface ICategoryCreateRequest {
  id?: string;
  uuid?: string;
  name: string;
  pid: string;
}

export interface ICategoryCreateResponse {
  message: string;
  success: boolean;
}

// export interface INewTreeview {
//     id: string
//     value: string
//     useYn: string
//     parentId: string
//     level: number
//     expand: boolean
//     hide: boolean
// }
