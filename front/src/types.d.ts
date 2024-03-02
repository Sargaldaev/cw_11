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

export interface Product {
  _id:string
  title: string;
  image: File | null;
  price: number;
}

export interface ProductPost {
  title: string;
  image: File | null;
  description: string;
  price: string;
  category: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface ProductInfo {
  _id:string
  user: {
    username:string,
    _id:string
  },
  title: string;
  image: File | null;
  description: string;
  price: number;
  category: string;
}
