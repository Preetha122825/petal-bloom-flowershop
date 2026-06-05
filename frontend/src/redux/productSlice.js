import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (params) => {
  const res = await api.get('/products', { params });
  return res.data;
});

export const fetchProduct = createAsyncThunk('products/fetchOne', async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.product;
});

export const createProduct = createAsyncThunk('products/create', async (data) => {
  const res = await api.post('/products', data);
  return res.data.product;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data.product;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], product: null, loading: false, error: null, total: 0, pages: 1, page: 1, filters: { category: 'All', search: '', maxPrice: 15000, sort: 'featured', page: 1 } },
  reducers: { setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload, page: 1 }; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending,   (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, a) => { state.loading = false; state.items = a.payload.products; state.total = a.payload.total; state.pages = a.payload.pages; })
      .addCase(fetchProducts.rejected,  (state, a) => { state.loading = false; state.error = a.error.message; })
      .addCase(fetchProduct.fulfilled,  (state, a) => { state.product = a.payload; })
      .addCase(createProduct.fulfilled, (state, a) => { state.items.unshift(a.payload); })
      .addCase(updateProduct.fulfilled, (state, a) => { state.items = state.items.map(p => p._id === a.payload._id ? a.payload : p); })
      .addCase(deleteProduct.fulfilled, (state, a) => { state.items = state.items.filter(p => p._id !== a.payload); });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
