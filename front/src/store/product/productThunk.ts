import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductInfo, ProductPost } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchDataCategory = createAsyncThunk<Product[], string>(
  'product/fetchData',
  async (category) => {
    try {
      const {data} = await axiosApi.get<Product[]>(`/products?category=${category}`);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
);

export const fetchProduct = createAsyncThunk<Product[]>(
  'product/fetchAll',
  async () => {
    const {data} = await axiosApi.get<Product[]>('/products');
    return data;
  }
);


export const fetchProductInfo = createAsyncThunk<ProductInfo, string>(
  'product/fetchProductInfo',
  async (id) => {
    try {
      const {data} = await axiosApi.get<ProductInfo>(`/products/${id}`);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'product/deleteProduct',
  async (id, {getState}) => {

    try {
      const token = getState().user.user?.token;
      await axiosApi.delete(`/products/${id}`, {headers: {'Authorization': token}});
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
);

export const createProduct = createAsyncThunk<Product[], ProductPost, { state: RootState }>(
  'product/createProduct',
  async (product, thunkAPI) => {
    const token = thunkAPI.getState().user.user?.token;
    const formData = new FormData();

    const keys = Object.keys(product) as (keyof ProductPost)[];
    keys.forEach(key => {
      const value = product[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post(
      '/products',
      formData,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    return response.data;
  }
);