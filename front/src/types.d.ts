export interface Register {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  phone: string;
  token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}