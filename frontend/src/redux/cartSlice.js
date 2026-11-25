import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchCart      = createAsyncThunk('cart/fetch',   async () => (await api.get('/cart')).data.cart);
export const addToCart      = createAsyncThunk('cart/add',     async (data) => (await api.post('/cart', data)).data.cart);
export const updateCartItem = createAsyncThunk('cart/update',  async ({ productId, quantity }) => (await api.put(`/cart/${productId}`, { quantity })).data.cart);
export const clearCart      = createAsyncThunk('cart/clear',   async () => { await api.delete('/cart'); return []; });

// Local cart for guests
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], loading: false },
  reducers: {
    addLocal:    (state, { payload }) => { const e = state.items.find(i => i._id === payload._id); if (e) e.quantity++; else state.items.push({ ...payload, quantity: 1 }); },
    removeLocal: (state, { payload }) => { state.items = state.items.filter(i => i._id !== payload); },
    updateLocal: (state, { payload: { id, quantity } }) => { const i = state.items.find(i => i._id === id); if (i) i.quantity = quantity; },
    clearLocal:  (state) => { state.items = []; },
  },
  extraReducers: (b) => {
    [fetchCart, addToCart, updateCartItem].forEach(t => b.addCase(t.fulfilled, (state, a) => { if (a.payload?.items) state.items = a.payload.items; }));
    b.addCase(clearCart.fulfilled, (state) => { state.items = []; });
  },
});

export const { addLocal, removeLocal, updateLocal, clearLocal } = cartSlice.actions;
export default cartSlice.reducer;
