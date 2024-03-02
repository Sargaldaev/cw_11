import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductInfo } from '../../types';
import { createProduct, deleteProduct, fetchDataCategory, fetchProduct, fetchProductInfo } from './productThunk.ts';

export interface ProductState {
  products: Product[];
  productInfo: ProductInfo | null;
  fetchLoad: boolean;
  fetchLoadInfo: boolean;
  deleteLoad: boolean;
  createLoad: boolean;
}

const initialState: ProductState = {
  products: [],
  productInfo: null,
  fetchLoad: false,
  deleteLoad: false,
  fetchLoadInfo: false,
  createLoad: false
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state: ProductState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state: ProductState, action: PayloadAction<Product[]>) => {
      state.fetchLoad = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state: ProductState) => {
      state.fetchLoad = false;
    });

    builder.addCase(fetchDataCategory.pending, (state: ProductState) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchDataCategory.fulfilled, (state: ProductState, action: PayloadAction<Product[]>) => {
      state.fetchLoad = false;
      state.products = action.payload;
    });
    builder.addCase(fetchDataCategory.rejected, (state: ProductState) => {
      state.fetchLoad = false;
    });


    builder.addCase(fetchProductInfo.pending, (state: ProductState) => {
      state.fetchLoadInfo = true;
    });
    builder.addCase(fetchProductInfo.fulfilled, (state: ProductState, action: PayloadAction<ProductInfo>) => {
      state.fetchLoadInfo = false;
      state.productInfo = action.payload;
    });
    builder.addCase(fetchProductInfo.rejected, (state: ProductState) => {
      state.fetchLoadInfo = false;
    });

    builder.addCase(deleteProduct.pending, (state: ProductState) => {
      state.deleteLoad = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state: ProductState) => {
      state.deleteLoad = false;
    });
    builder.addCase(deleteProduct.rejected, (state: ProductState) => {
      state.deleteLoad = false;
    });

    builder.addCase(createProduct.pending, (state: ProductState) => {
      state.createLoad = true;
    });
    builder.addCase(createProduct.fulfilled, (state: ProductState) => {
      state.createLoad = false;
    });
    builder.addCase(createProduct.rejected, (state: ProductState) => {
      state.createLoad = false;
    });
  },
});

export const productReducer = productSlice.reducer;
