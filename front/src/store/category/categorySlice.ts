import { Category } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from './categoryThunk.ts';

interface CategoriesState {
  categories: Category[];
  fetchLoad: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  fetchLoad: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoad = true;
    }).addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
      state.fetchLoad = false;
      state.categories = action.payload;
    }).addCase(fetchCategories.rejected, (state) => {
      state.fetchLoad = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;
