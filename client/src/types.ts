export type YogaClassType = {
  id: number;
  class_type: string;
  teacher_name: string;
  description: string;
  users_list?: string[];
};

export type KnownError = {
  message: string;
  description: string;
  code: number | undefined;
};

export type AuthState = {
  access_token: string | null;
};

export interface LoginData {
  email: string;
  password: string;
}

export type UserType = {
  email: string;
  // role: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type GenericResponse = {
  data: {
    status: string;
    message: string;
  };
  message?: string;
};

export interface LoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: UserType;
  };
}
