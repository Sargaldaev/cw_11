export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phone: string;
  token: string;
}

export interface Product {
  user: user;
  title: string;
  image: File | null;
  description: string;
  price: string;
  category: string;
}
